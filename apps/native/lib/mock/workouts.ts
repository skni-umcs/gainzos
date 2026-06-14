import type { WorkoutDTO } from '@gainzos/types';

/** Completed workouts, most recent first. `volume` is a string per the DTO contract. */
export const WORKOUTS: WorkoutDTO[] = [
  { id: 1, userId: 1, workoutTemplateId: 1, volume: '8420', duration: 3540, createdAt: '2026-06-13T08:12:00Z' },
  { id: 2, userId: 1, workoutTemplateId: 2, volume: '7110', duration: 3180, createdAt: '2026-06-11T08:30:00Z' },
  { id: 3, userId: 1, workoutTemplateId: 3, volume: '12600', duration: 4020, createdAt: '2026-06-10T07:50:00Z' },
  { id: 4, userId: 1, workoutTemplateId: 4, volume: '9240', duration: 3360, createdAt: '2026-06-08T18:05:00Z' },
  { id: 5, userId: 1, workoutTemplateId: 1, volume: '8050', duration: 3300, createdAt: '2026-06-06T08:00:00Z' },
  { id: 6, userId: 1, workoutTemplateId: 3, volume: '11980', duration: 3900, createdAt: '2026-06-03T07:40:00Z' },
  { id: 7, userId: 1, workoutTemplateId: 2, volume: '6890', duration: 3060, createdAt: '2026-06-01T08:20:00Z' },
];
