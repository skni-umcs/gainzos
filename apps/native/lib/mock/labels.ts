import { MUSCLE_GROUP, type MuscleGroup, type Activity, type Goal, type Gender } from '@gainzos/constants';
import { colors } from '@/theme';

/** Broad muscle categories used by the design's filter chips (not in @gainzos/constants). */
export type MuscleCategory = 'Chest' | 'Back' | 'Shoulders' | 'Arms' | 'Legs' | 'Core';

export const MUSCLE_CATEGORIES: MuscleCategory[] = [
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Legs',
  'Core',
];

/** Maps a specific muscle to its broad category. */
export const muscleCategory: Record<MuscleGroup, MuscleCategory> = {
  [MUSCLE_GROUP.UPPER_CHEST]: 'Chest',
  [MUSCLE_GROUP.MIDDLE_CHEST]: 'Chest',
  [MUSCLE_GROUP.LOWER_CHEST]: 'Chest',
  [MUSCLE_GROUP.UPPER_BACK]: 'Back',
  [MUSCLE_GROUP.MIDDLE_BACK]: 'Back',
  [MUSCLE_GROUP.LOWER_BACK]: 'Back',
  [MUSCLE_GROUP.LATS]: 'Back',
  [MUSCLE_GROUP.TRAPS]: 'Back',
  [MUSCLE_GROUP.FRONT_DELTS]: 'Shoulders',
  [MUSCLE_GROUP.SIDE_DELTS]: 'Shoulders',
  [MUSCLE_GROUP.REAR_DELTS]: 'Shoulders',
  [MUSCLE_GROUP.BICEPS]: 'Arms',
  [MUSCLE_GROUP.TRICEPS]: 'Arms',
  [MUSCLE_GROUP.FOREARMS]: 'Arms',
  [MUSCLE_GROUP.QUADS]: 'Legs',
  [MUSCLE_GROUP.HAMSTRINGS]: 'Legs',
  [MUSCLE_GROUP.GLUTES]: 'Legs',
  [MUSCLE_GROUP.CALVES]: 'Legs',
  [MUSCLE_GROUP.HIP_FLEXORS]: 'Legs',
  [MUSCLE_GROUP.ADDUCTORS]: 'Legs',
  [MUSCLE_GROUP.ABDUCTORS]: 'Legs',
  [MUSCLE_GROUP.ABS]: 'Core',
  [MUSCLE_GROUP.OBLIQUES]: 'Core',
  [MUSCLE_GROUP.CORE]: 'Core',
};

/** "MIDDLE_CHEST" → "Middle Chest". */
export function muscleLabel(muscle: MuscleGroup): string {
  return muscle
    .split('_')
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ');
}

/** Unique categories covered by a set of muscles, in canonical order. */
export function categoriesOf(muscles: MuscleGroup[]): MuscleCategory[] {
  const set = new Set(muscles.map((m) => muscleCategory[m]));
  return MUSCLE_CATEGORIES.filter((c) => set.has(c));
}

export const ACTIVITY_LABEL: Record<Activity, string> = {
  NONE: 'Sedentary',
  LOW: 'Lightly Active',
  MEDIUM: 'Moderately Active',
  HIGH: 'Highly Active',
  VERY_HIGH: 'Athlete',
};

export const GOAL_LABEL: Record<Goal, string> = {
  LOSE_WEIGHT: 'Lose Weight',
  MAINTAIN_WEIGHT: 'Maintain',
  GAIN_WEIGHT: 'Gain Muscle',
};

export const GENDER_LABEL: Record<Gender, string> = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
};

/** Force types are free-form strings on ExerciseDTO; these are the values the mock uses. */
export const FORCES = ['Push', 'Pull', 'Static'] as const;
export type Force = (typeof FORCES)[number];

export function forceColor(force: string): string {
  if (force === 'Push') return colors.accentBr;
  if (force === 'Pull') return '#7dd3fc';
  return colors.text2;
}
