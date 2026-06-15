import { z } from "zod/v4";
import { APIErrorResponseSchema } from "./GlobalSchema";

export const SpotifyAuthBodySchema = z.object({
  code: z.string().min(1),
  accessToken: z.optional(z.string()),
  refreshToken: z.optional(z.string()),
});
export const SpotifyAuthResponseSchema = {
  "2xx": z.object({
    type: z.literal("success"),
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
  "4xx": APIErrorResponseSchema,
  "5xx": APIErrorResponseSchema,
};

export const SpotifySearchTracksBodySchema = z.object({
  items: z.array(
    z.object({
      source: z.enum(["SHAZAM", "YOUTUBE"]),
      title: z.string(),
      artist: z.string(),
    }),
  ),
});
export const SpotifySearchTracksReponseSchema = {
  "2xx": z.object({
    type: z.literal("success"),
    tracks: z.array(z.string()),
  }),
  "4xx": APIErrorResponseSchema,
  "5xx": APIErrorResponseSchema,
};

export const SpotifyCreatePlaylistBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  items: z.array(z.string()),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const SpotifyCreatePlaylistResponseSchema = {
  "2xx": z.object({
    type: z.literal("success"),
    playlistId: z.string(),
    uri: z.url(),
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
  "4xx": APIErrorResponseSchema,
  "5xx": APIErrorResponseSchema,
};
