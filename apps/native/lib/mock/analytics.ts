import type { MuscleCategory } from './labels';

/** 12-week trend series (most recent week last). */
export const VOLUME_TREND = [21, 24, 23, 28, 26, 31, 29, 34, 33, 30, 37, 39]; // tonnes / week
export const DURATION_TREND = [142, 156, 150, 168, 160, 175, 171, 182, 178, 165, 190, 196]; // minutes / week
export const CAL_TREND = [1820, 2010, 1960, 2240, 2150, 2380, 2300, 2520, 2470, 2280, 2640, 2710];
export const FREQ = [3, 4, 3, 4, 4, 5, 4, 5, 5, 3, 5, 5]; // workouts / week
export const WEIGHT_TREND = [80.1, 80.4, 80.9, 81.2, 81.0, 81.6, 81.9, 82.1, 81.8, 82.0, 82.3, 82.4]; // kg

/** Muscle-group distribution from completed workouts (%). */
export const MUSCLE_DIST: { group: MuscleCategory; pct: number }[] = [
  { group: 'Legs', pct: 28 },
  { group: 'Back', pct: 22 },
  { group: 'Chest', pct: 19 },
  { group: 'Shoulders', pct: 14 },
  { group: 'Arms', pct: 11 },
  { group: 'Core', pct: 6 },
];

/** Today's at-a-glance progress (home screen). */
export const TODAY = {
  greetingName: 'Marcus',
  calories: 1840,
  calorieGoal: 2700,
  workoutsDone: 1,
  workoutsPlanned: 2,
  streak: 6,
};
