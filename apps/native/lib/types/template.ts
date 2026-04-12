import { WorkoutItemSchema } from "./workout-item";
import { MuscleGroup } from "../enums/muscle-group";
import { z } from "zod";

export const TemplateSchema = z.object({
    id: z.number().nullable(),
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(500),
    muscleGroups: z.array(z.nativeEnum(MuscleGroup)),
    ownerId: z.number(),
    isPublic: z.boolean(),
    items: z.array(WorkoutItemSchema),
});

export type Template = z.infer<typeof TemplateSchema>;


