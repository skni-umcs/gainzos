import { z } from "zod";

export const ExerciseSchema = z.object({
  id: z.number().nullish(),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  exercisesType: z.object({
    id: z.number(),
    name: z.string().nullish(),
  }),
  image: z.object({
    id: z.number(),
  }),
  video: z.object({
    id: z.number(),
  }),
});


export type Exercise = z.infer<typeof ExerciseSchema>;