import { MuscleGroup} from "@gainzos/constants";
import { ExerciseTypeDTO } from "./exercise-type";
import { MediaDTO } from "./media";

export type ExerciseDTO = {
    id: string;
    name: string;
    destription: string;
    force: string;
    primaryMuscle: MuscleGroup;
    secondaryMuscle: MuscleGroup;
    exerciseType: ExerciseTypeDTO;
    image: MediaDTO;
    video: MediaDTO;
}