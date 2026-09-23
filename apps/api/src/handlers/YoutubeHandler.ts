import { FastifyInstance } from "fastify";
import { getOrDownloadSong, getLinkMeta } from "../helpers/Youtube";
import { getSongInfosFromShazamResult, shazamSong } from "../helpers/Shazam";
import {
  deleteChunksOf,
  deleteFiles,
  getBpm,
  getChunks,
  parseChunkRange,
} from "../helpers/Utilities";
import {
  PrismaClient,
  SongMatch as SongMatchRecord,
  VideoMeta as VideoMetaRecord,
} from "../../generated/prisma/client";
import {
  ErrorMetaResponse,
  LinkMetaResponse,
  SongMatch,
  SongMatchSource,
  VideoMetaResponse,
  VideoMetaResponseWithSongMatches,
} from "../types";

export const analyzeLinks = async (
  fastify: FastifyInstance,
  prisma: PrismaClient,
  links: string[],
): Promise<Record<string, LinkMetaResponse>> => {
  let linksMeta: Record<string, LinkMetaResponse> = {};
  for (const videoURI of links) {
    const linkMeta = await getLinkMeta(prisma, videoURI);
    linksMeta = { ...linksMeta, [videoURI]: linkMeta };
  }

  return linksMeta;
};

export const identifyLinks = async (
  fastify: FastifyInstance,
  prisma: PrismaClient,
  links: string[],
  matchType: SongMatchSource[] = ["YOUTUBE", "SHAZAM"],
  skipDurationLimit = false,
): Promise<Record<string, LinkMetaResponse>> => {
  let linksMeta: Record<string, LinkMetaResponse> = {};
  for (const videoURI of links) {
    const linkMeta = await getLinkMeta(prisma, videoURI);
    linksMeta = { ...linksMeta, [videoURI]: linkMeta };
  }

  const result: Record<string, LinkMetaResponse> = {};
  for (const entry in linksMeta) {
    const entryMeta = linksMeta[entry];
    if (entryMeta.type === "PLAYLIST") {
      for (const item of entryMeta.items) {
        result[item.uri] = await identifyLink(
          prisma,
          item,
          matchType,
          skipDurationLimit,
        );
      }
      continue;
    } else if (entryMeta.type === "VIDEO") {
      result[entry] = await identifyLink(
        prisma,
        entryMeta.videoDetails,
        matchType,
        skipDurationLimit,
      );
    } else {
      result[entry] = entryMeta;
    }
  }

  return result;
};

export const identifyLink = async (
  prisma: PrismaClient,
  videoDetails: VideoMetaResponse["videoDetails"],
  matchType: SongMatchSource[] = ["SHAZAM"],
  skipDurationLimit = false,
): Promise<VideoMetaResponseWithSongMatches | ErrorMetaResponse> => {
  if (!skipDurationLimit && Number(videoDetails.lengthSeconds) >= 600) {
    const linkMeta = await getLinkMeta(prisma, videoDetails.uri);
    if (linkMeta.type === "VIDEO" && "songMatches" in linkMeta.videoDetails) {
      return linkMeta as VideoMetaResponseWithSongMatches;
    }
    return {
      type: "ERROR",
      message: `Incorrect link type: ${linkMeta.type}`,
    };
  }

  const songMatches: SongMatch[] = [];
  if (matchType.includes("SHAZAM")) {
    const shazamMatches = await getShazamSongMatches(prisma, videoDetails);
    songMatches.push(
      ...shazamMatches.filter(({ source }) => source === "SHAZAM"),
    );
  }
  if (matchType.includes("YOUTUBE")) {
    const linkMeta = await getLinkMeta(prisma, videoDetails.uri);
    if (linkMeta.type !== "VIDEO") {
      return {
        type: "ERROR",
        message: `Incorrect link type: ${linkMeta.type}`,
      };
    }
    songMatches.push(
      ...(linkMeta.videoDetails.songMatches?.filter(
        ({ source }) => source === "YOUTUBE",
      ) || []),
    );
  }

  return {
    type: "VIDEO",
    videoDetails: {
      ...videoDetails,
      songMatches,
    },
  };
};

// Shazaming is network bound while BPM detection is CPU bound, so a couple of
// chunks in flight is enough to keep both busy without thrashing either.
const CHUNK_CONCURRENCY = 2;

type VideoMetaWithMatches = VideoMetaRecord & {
  songMatches: SongMatchRecord[];
};

/**
 * Recognizes a chunk and detects its BPM at the same time, reusing whatever is
 * already stored for that chunk, then persists both in a single row.
 */
const analyzeChunk =
  (
    prisma: PrismaClient,
    videoMeta: VideoMetaWithMatches | null,
    sourceFilePath: string,
  ) =>
  async (chunkPath: string): Promise<SongMatch | undefined> => {
    const { chunkStart, chunkEnd } = parseChunkRange(chunkPath);
    const cachedShazamMatch = videoMeta?.songMatches.find(
      (match) =>
        match.source === "SHAZAM" &&
        match.chunkStart === chunkStart &&
        match.chunkEnd === chunkEnd,
    );

    try {
      if (cachedShazamMatch && cachedShazamMatch.bpm !== null) {
        return {
          source: "SHAZAM",
          title: cachedShazamMatch.title,
          artist: cachedShazamMatch.artist,
          bpm: cachedShazamMatch.bpm,
        };
      }

      // Neither of those is allowed to reject: a failed BPM detection still
      // gives a song match, and the chunk is only deleted once both are done.
      const [songInfos, bpm] = await Promise.all([
        cachedShazamMatch
          ? Promise.resolve<SongMatch>({
              source: "SHAZAM",
              title: cachedShazamMatch.title,
              artist: cachedShazamMatch.artist,
            })
          : shazamSong(chunkPath)
              .then(getSongInfosFromShazamResult)
              .catch((error) => {
                console.error(`Shazam failed for ${chunkPath}`, error);
                return undefined;
              }),
        getBpm(chunkPath)
          .then(Math.round)
          .catch((error) => {
            console.error(error);
            return undefined;
          }),
      ]);

      if (!songInfos) {
        console.log("No match found");
        return;
      }
      console.log(
        `Found: ${songInfos.title} - ${songInfos.artist}${bpm ? ` (${bpm} BPM)` : ""}`,
      );

      if (videoMeta) {
        await (cachedShazamMatch
          ? prisma.songMatch.update({
              where: { id: cachedShazamMatch.id },
              data: { bpm },
            })
          : prisma.songMatch.create({
              data: {
                source: "SHAZAM",
                title: songInfos.title,
                artist: songInfos.artist,
                chunkStart,
                chunkEnd,
                bpm,
                videoMetaId: videoMeta.id,
              },
            }));
      }

      return { ...songInfos, bpm };
    } catch (error) {
      console.error(`Failed to analyze ${chunkPath}`, error);
      return;
    } finally {
      // Short videos are analyzed as a whole, their only chunk is the song itself
      if (chunkPath !== sourceFilePath) {
        deleteFiles([chunkPath]);
      }
    }
  };

export const getShazamSongMatches = async (
  prisma: PrismaClient,
  videoDetails: VideoMetaResponse["videoDetails"],
): Promise<SongMatch[]> => {
  const videoMeta = await prisma.videoMeta.findUnique({
    where: { uri: videoDetails.uri },
    include: {
      songMatches: true,
    },
  });
  const cachedMatches =
    videoMeta?.songMatches?.filter((m) => m.source === "SHAZAM") || [];
  // Matches stored before BPM detection existed need the song again to get one
  const shouldSkipDownload =
    cachedMatches.length > 0 && cachedMatches.every(({ bpm }) => bpm !== null);

  if (shouldSkipDownload) {
    return cachedMatches.map((match) => ({
      source: match.source,
      title: match.title,
      artist: match.artist,
      bpm: match.bpm ?? undefined,
    }));
  }

  const filePath = await getOrDownloadSong(videoDetails.uri);
  if (!filePath) {
    throw new Error("Couldn't download the song");
  }

  try {
    // Chunks are analyzed as soon as ffmpeg spits them out, so the recognition
    // of the first ones overlaps with the cutting of the last ones. The stream
    // operators are untyped, their elements are the analyzeChunk results.
    const shazamMatches = (await getChunks(
      filePath,
      Number(videoDetails.lengthSeconds),
    )
      .map(analyzeChunk(prisma, videoMeta, filePath), {
        concurrency: CHUNK_CONCURRENCY,
      })
      .filter((match?: SongMatch) => match !== undefined)
      .toArray()) as SongMatch[];

    return shazamMatches;
  } finally {
    deleteChunksOf(filePath);
    deleteFiles([filePath]);
  }
};

export default {
  analyzeLinks,
  identifyLinks,
};
