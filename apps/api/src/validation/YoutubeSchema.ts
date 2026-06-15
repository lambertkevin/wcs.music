import { z } from "zod/v4";

export const YoutubeVideoURIRegex =
  /(?:https:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/s;

/**
 * Youtube playlist ID length can vary, following link is explaining the possibilities
 * @see https://ytp-length.vercel.app/blogs/decoding-youtube-playlist-ids/
 */
export const YoutubePlaylistURIRegex =
  /^(?:https:\/\/)?(?:www\.)?youtube\.com\/playlist\?list=([a-zA-Z0-9_-]{18,34})/s;

const YouTubeVideoURISchema = z.string().regex(YoutubeVideoURIRegex);

const YouTubePlaylistURISchema = z.string().regex(YoutubePlaylistURIRegex);

export const AnalyzeLinksBodySchema = z.object({
  links: z.array(z.union([YouTubeVideoURISchema, YouTubePlaylistURISchema])),
});

export const RecognizeLinksBodySchema = z.object({
  skipDurationLimit: z.optional(z.boolean()),
  links: z.array(z.union([YouTubeVideoURISchema, YouTubePlaylistURISchema])),
  songMatchSources: z.optional(
    z
      .array(z.enum(["SHAZAM", "YOUTUBE"]))
      .min(1)
      .max(2),
  ),
});
