import { WorkoutItemDTO } from "./workout-item";
import { MuscleGroup } from "../../constants/src/enums";



export type WorkoutTemplateDTO = {
    id: number;
    name: string;
    description: string;
    muscleGroups: MuscleGroup[];
    ownerId: number;
    isPublic: boolean;
    items: WorkoutItemDTO[];
}