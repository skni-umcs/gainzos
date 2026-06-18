import type { ExerciseDTO } from "./exercise";
import type { WorkoutSetDTO } from "./workout-set";

export type WorkoutItemDTO = {
    id: number;
    exercise: ExerciseDTO;
    sets: WorkoutSetDTO[];
}
