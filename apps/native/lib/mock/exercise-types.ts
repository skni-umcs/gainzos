import type { ExerciseTypeDTO } from '@gainzos/types';
import { PLACEHOLDER_MEDIA } from './media';

/** Exercise categories. Ids are stable numbers (used as the `library/[type]` route param). */
export const EXERCISE_TYPES: ExerciseTypeDTO[] = [
  { id: 1, name: 'Chest', media: PLACEHOLDER_MEDIA },
  { id: 2, name: 'Back', media: PLACEHOLDER_MEDIA },
  { id: 3, name: 'Legs', media: PLACEHOLDER_MEDIA },
  { id: 4, name: 'Shoulders', media: PLACEHOLDER_MEDIA },
  { id: 5, name: 'Arms', media: PLACEHOLDER_MEDIA },
  { id: 6, name: 'Core', media: PLACEHOLDER_MEDIA },
];

/** Design-only display metadata (exercise counts aren't derivable from the small mock set). */
export const EXERCISE_TYPE_COUNT: Record<number, number> = {
  1: 18,
  2: 22,
  3: 26,
  4: 15,
  5: 20,
  6: 14,
};

export const exerciseTypeById = (id: number): ExerciseTypeDTO | undefined =>
  EXERCISE_TYPES.find((t) => t.id === id);
