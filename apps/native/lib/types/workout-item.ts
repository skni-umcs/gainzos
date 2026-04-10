import { Exercise } from "./exercise";

export type WorkoutItem = {
  id: number;
  exercise: Exercise;
  sets: number;
  reps: number;
};
