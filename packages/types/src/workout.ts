export type WorkoutDTO = {
    id: number;
    userId: number;
    workoutTemplateId: number;
    volume: string;
    duration: number;
    createdAt: string; // ISO date string
}