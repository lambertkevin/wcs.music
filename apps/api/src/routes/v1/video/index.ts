import { type FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { analyzeLinks, identifyLinks } from "../../../handlers/YoutubeHandler";
import {
  AnalyzeLinksBodySchema,
  RecognizeLinksBodySchema,
} from "../../../validation/YoutubeSchema";
import { prisma } from "../../../prisma";

const YtRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: `/analyze`,
    schema: {
      body: AnalyzeLinksBodySchema,
    },
    handler: async (req) => {
      const { links } = req.body;
      return analyzeLinks(fastify, prisma, links);
    },
  });

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: `/identify`,
    schema: {
      body: RecognizeLinksBodySchema,
    },
    handler: async (req) => {
      const { links, skipDurationLimit, songMatchSources } = req.body;
      return identifyLinks(
        fastify,
        prisma,
        links,
        songMatchSources,
        skipDurationLimit,
      );
    },
  });
};

export default YtRoutes;
