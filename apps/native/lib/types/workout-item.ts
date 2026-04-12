
import { ExerciseSchema } from "./exercise";
import { z } from "zod";

export const WorkoutItemSchema = z.object({
    id: z.number(),
    exercise: ExerciseSchema,
    sets: z.number().int().positive(),
    reps: z.number().int().positive(),
    durationSeconds: z.number().int().positive(),
    restTimeSeconds: z.number().int().positive(),
    weight: z.number().positive(),
});

export type WorkoutItem = z.infer<typeof WorkoutItemSchema>;