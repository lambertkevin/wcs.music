import asyncPool from "tiny-async-pool";
import { FastifyInstance } from "fastify";
import { downloadSong, getLinkMeta } from "../helpers/Youtube";
import { deleteFiles, getChunks } from "../helpers/Utilities";
import { PrismaClient } from "../../generated/prisma/client";
import {
  getSongInfosFromShazamResult,
  cachedShazamSong,
} from "../helpers/Shazam";
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
  const shouldSkipDownload =
    (videoMeta?.songMatches?.filter((m) => m.source === "SHAZAM")?.length ||
      0) > 0;

  if (shouldSkipDownload) {
    return (
      videoMeta?.songMatches?.map((match) => ({
        source: match.source,
        title: match.title,
        artist: match.artist,
      })) || []
    );
  }

  const filePath = await downloadSong(videoDetails.uri);
  if (!filePath) {
    throw new Error("Couldn't download the song");
  }
  const chunks = getChunks(filePath, Number(videoDetails.lengthSeconds));

  const shazamMatches: SongMatch[] = [];
  for await (const shazamResult of asyncPool(
    2,
    Array.from(chunks),
    cachedShazamSong(videoDetails.uri, prisma),
  )) {
    const songInfos = getSongInfosFromShazamResult(shazamResult);
    if (songInfos) {
      console.log(`Found: ${songInfos.title} - ${songInfos.artist}`);
      shazamMatches.push(songInfos);
    } else {
      console.log("No match found");
    }
  }
  deleteFiles([...chunks, filePath]);

  return shazamMatches;
};

export default {
  analyzeLinks,
  identifyLinks,
};
