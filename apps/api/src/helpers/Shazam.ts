import { Shazam } from "node-shazam";
import { ShazamRecognized, SongMatch } from "../types";

export const shazamSong = async (filePath: string): ShazamRecognized => {
  console.log(`Start Shazaming`);
  const shazam = new Shazam();
  const song = await shazam.recognise(filePath);
  console.log(`Finished Shazaming`);

  return song;
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
