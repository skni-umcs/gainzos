import { z } from "zod";

export const mediaSchema = z.object({
    id: z.number().nullish(),
    url: z.string().nullish(),
})

export type Media = z.infer<typeof mediaSchema>;