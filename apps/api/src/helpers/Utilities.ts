import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

export const getChunks = (
  filePath: string,
  totalDurationSeconds: number,
  dryRun = false,
  startSeconds = 10,
  maxChunkDurationSeconds = 120,
): Set<string> => {
  if (totalDurationSeconds <= maxChunkDurationSeconds)
    return new Set([filePath]);

  const chunksPaths = new Set<string>();
  for (
    let start = startSeconds;
    start <= totalDurationSeconds;
    start += maxChunkDurationSeconds
  ) {
    const chunkName = `${path.parse(filePath).name}-${start}-${Math.min(start + maxChunkDurationSeconds, totalDurationSeconds)}.mp3`;
    const chunkPath = path.resolve(`./tmp/${chunkName}`);
    if (!dryRun) {
      execSync(
        `ffmpeg -hide_banner -loglevel error -y -ss ${start} -t ${maxChunkDurationSeconds} -i "${filePath}" ` +
          `-vn -ar 44100 -ac 1 -b:a 128k "${chunkPath}"`,
      );
    }
    chunksPaths.add(chunkPath);
  }

  return chunksPaths;
};

export const deleteFiles = (chunksPaths: string[] | Set<string>): void => {
  for (const path of chunksPaths) {
    try {
      console.log(`Deleting ${path}`);
      fs.rmSync(path);
    } catch (e) {
      console.log(`Failed deleted ${path}`);
    }
  }
};

export const wait = (timeout: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, timeout));
