import path from "node:path";
import { Shazam } from "node-shazam";
import { ShazamRecognized, SongMatch } from "../types";
import { PrismaClient } from "../../generated/prisma/client";

export const shazamSong = async (filePath: string): ShazamRecognized => {
  console.log(`Start Shazaming`);
  const shazam = new Shazam();
  const song = await shazam.recognise(filePath);
  console.log(`Finished Shazaming`);

  return song;
};

export const cachedShazamSong =
  (videoURI: string, prisma: PrismaClient) =>
  async (filePath: string): ShazamRecognized => {
    const linkMeta = await prisma.videoMeta.findUnique({
      where: {
        uri: videoURI,
      },
      include: { songMatches: true },
    });

    const [, chunkStart = "0", chunkEnd = "0"] =
      path.parse(filePath).name.match(/(\d*)-(\d*)$/) || [];

    if (linkMeta?.songMatches) {
      const maybeMatch = linkMeta.songMatches.find(
        (match) =>
          match.chunkStart === Number(chunkStart) &&
          match.chunkEnd === Number(chunkEnd) &&
          match.source === "SHAZAM",
      );
      if (maybeMatch) {
        return {
          title: maybeMatch.title,
          artist: maybeMatch.artist,
          album: "",
          year: "",
        };
      }
    }

    const result = await shazamSong(filePath);
    const songInfos = getSongInfosFromShazamResult(result);
    if (songInfos && linkMeta) {
      await prisma.songMatch.create({
        data: {
          source: "SHAZAM",
          title: songInfos.title,
          artist: songInfos.artist,
          chunkStart: Number(chunkStart),
          chunkEnd: Number(chunkEnd),
          videoMetaId: linkMeta.id,
        },
      });
    }
    return result;
  };

export const getSongInfosFromShazamResult = (
  shazamResult: Awaited<ShazamRecognized>,
): SongMatch | undefined => {
  if (!shazamResult) {
    return;
  }
  if ("title" in shazamResult) {
    return {
      source: "SHAZAM",
      title: shazamResult.title,
      artist: shazamResult.artist,
    };
  }
  if ("matches" in shazamResult) {
    return {
      source: "SHAZAM",
      title: shazamResult?.track.title,
      artist: shazamResult?.track.subtitle,
    };
  }
};
