import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { execFile } from "node:child_process";

// Cutting chunks is IO/CPU bound, a couple of ffmpeg at a time is enough to
// keep the consumer fed without starving the analysis running alongside it.
const FFMPEG_CONCURRENCY = 2;

const chunkRangeRegex = new RegExp(/(\d*)-(\d*)$/);

/**
 * Streams the chunk paths, each one pushed as soon as ffmpeg is done with it so
 * the consumer can start working on it while the next ones are still being cut.
 */
export const getChunks = (
  filePath: string,
  totalDurationSeconds: number,
  dryRun = false,
  // Skip the first 10 seconds of the song to avoid the potential intro
  startSeconds = 10,
  // Chunks should be around 1m30 to match a song duration during a competition
  maxChunkDurationSeconds = 90,
): Readable => {
  if (totalDurationSeconds <= maxChunkDurationSeconds)
    return Readable.from([filePath]);

  const starts: number[] = [];
  for (
    let start = startSeconds;
    start <= totalDurationSeconds;
    start += maxChunkDurationSeconds
  ) {
    starts.push(start);
  }

  const cutChunk = async (start: number): Promise<string> => {
    const end = Math.min(start + maxChunkDurationSeconds, totalDurationSeconds);
    const chunkPath = getChunkPath(filePath, start, end);
    if (dryRun) return chunkPath;

    await new Promise<void>((resolve, reject) => {
      execFile(
        "ffmpeg",
        [
          ...["-hide_banner", "-loglevel", "error", "-y"],
          ...["-ss", String(start), "-t", String(maxChunkDurationSeconds)],
          ...["-i", filePath],
          ...["-vn", "-ar", "44100", "-ac", "1", "-b:a", "128k", chunkPath],
        ],
        (error) =>
          error
            ? reject(
                new Error(`Failed to cut the chunk ${chunkPath}`, {
                  cause: error,
                }),
              )
            : resolve(),
      );
    });

    return chunkPath;
  };

  return Readable.from(starts).map(cutChunk, {
    concurrency: FFMPEG_CONCURRENCY,
  });
};

export const getChunkPath = (
  filePath: string,
  startSeconds: number,
  endSeconds: number,
): string =>
  path.resolve(
    `./tmp/${path.parse(filePath).name}-${startSeconds}-${endSeconds}.mp3`,
  );

export const parseChunkRange = (
  chunkPath: string,
): { chunkStart: number; chunkEnd: number } => {
  const [, chunkStart = "0", chunkEnd = "0"] =
    path.parse(chunkPath).name.match(chunkRangeRegex) || [];

  return { chunkStart: Number(chunkStart), chunkEnd: Number(chunkEnd) };
};

export const deleteFiles = (chunksPaths: string[] | Set<string>): void => {
  for (const path of chunksPaths) {
    try {
      console.log(`Deleting ${path}`);
      fs.rmSync(path);
    } catch {
      console.log(`Failed deleted ${path}`);
    }
  }
};

/**
 * Chunks are deleted as soon as they are consumed, this sweeps the ones left
 * behind when the pipeline is interrupted halfway through.
 */
export const deleteChunksOf = (filePath: string): void => {
  const tmpPath = path.resolve("./tmp");
  const chunkPrefix = `${path.parse(filePath).name}-`;

  try {
    deleteFiles(
      fs
        .readdirSync(tmpPath)
        .filter((name) => name.startsWith(chunkPrefix))
        .map((name) => path.join(tmpPath, name)),
    );
  } catch {
    console.log(`Failed to list the chunks of ${filePath}`);
  }
};

export const wait = (timeout: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, timeout));
