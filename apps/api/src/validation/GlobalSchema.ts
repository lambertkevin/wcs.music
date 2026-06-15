import z from "zod/v4";

export const APIErrorResponseSchema = z.object({
  type: z.literal("error"),
  message: z.string(),
  details: z.optional(z.any()),
});
