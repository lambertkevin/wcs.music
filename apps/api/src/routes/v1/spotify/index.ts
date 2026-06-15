import { type FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { getUserAccessToken } from "../../../helpers/Spotify";
import {
  SpotifyAuthBodySchema,
  SpotifyAuthResponseSchema,
  SpotifyCreatePlaylistBodySchema,
  SpotifyCreatePlaylistResponseSchema,
  SpotifySearchTracksBodySchema,
  SpotifySearchTracksReponseSchema,
} from "../../../validation/SpotifySchema";
import {
  searchTracksFromSongMatches,
  savePlaylist,
} from "../../../handlers/SpotifyHandler";
import { prisma } from "../../../prisma";

const SpotifyRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/auth",
    schema: {
      body: SpotifyAuthBodySchema,
      response: SpotifyAuthResponseSchema,
    },
    handler: async (req, reply) => {
      const { code, refreshToken } = req.body;
      const auth = await getUserAccessToken(fastify, code, refreshToken);

      return reply
        .code(auth.type === "error" ? auth.code || 500 : 200)
        .send(auth);
    },
  });

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/search-tracks",
    schema: {
      body: SpotifySearchTracksBodySchema,
      response: SpotifySearchTracksReponseSchema,
    },
    handler: async (req, reply) => {
      const { items } = req.body;
      const searchTracksFromSongMatchesResponse =
        await searchTracksFromSongMatches(fastify, prisma, items);

      return reply
        .code(
          searchTracksFromSongMatchesResponse.type === "error"
            ? searchTracksFromSongMatchesResponse.code || 500
            : 200,
        )
        .send(searchTracksFromSongMatchesResponse);
    },
  });

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/create-playlist",
    schema: {
      body: SpotifyCreatePlaylistBodySchema,
      response: SpotifyCreatePlaylistResponseSchema,
    },
    handler: async (req, reply) => {
      if (!req.body.refreshToken || !req.body.accessToken) {
        return reply.code(401).send({
          type: "error",
          message: "Missing tokens",
        });
      }

      const { name, description, items, accessToken, refreshToken } = req.body;
      const savePlaylistResponse = await savePlaylist(
        fastify,
        prisma,
        accessToken,
        refreshToken,
        name,
        description,
        items,
      );

      return reply
        .code(
          savePlaylistResponse.type === "error"
            ? savePlaylistResponse.code || 500
            : 201,
        )
        .send(savePlaylistResponse);
    },
  });
};

export default SpotifyRoutes;
