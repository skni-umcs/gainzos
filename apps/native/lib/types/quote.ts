import { z } from "zod";

export const quoteSchema = z.object({
  id: z.number().nullish(),
  author: z.string().min(1).max(255),
  text: z.string().min(1).max(255),
  isVulgar: z.boolean().default(false),
});

export type Quote = z.infer<typeof quoteSchema>;