import type { ExerciseDTO } from "./exercise";

export type WorkoutItemDTO = {
    id: number;
    exercise: ExerciseDTO;
    sets: number;
    reps: number;
    durationSeconds: number;
    restTimeSeconds: number;
    weight: number;
}