import { z } from "zod";


export const ExerciseTypeSchema = z.object({
  id: z.number().nullish(),
  name: z.string().min(1).max(100),
  image: z.object({
    id: z.number(),
  })
});

export type ExerciseType = z.infer<typeof ExerciseTypeSchema>;

