import type { MediaDTO } from "./media";

export type ExerciseTypeDTO = {
    id: number;
    name: string;
    media: MediaDTO;
}