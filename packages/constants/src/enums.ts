export const ACTIVITY = {
  NONE: 'NONE',
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  VERY_HIGH: 'VERY_HIGH',
};

export type Activity = (typeof ACTIVITY)[keyof typeof ACTIVITY];

export const GOAL = {
  LOSE_WEIGHT: 'LOSE_WEIGHT',
  MAINTAIN_WEIGHT: 'MAINTAIN_WEIGHT',
  GAIN_WEIGHT: 'GAIN_WEIGHT',
};

export type Goal = (typeof GOAL)[keyof typeof GOAL];

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
};

export type Gender = (typeof GENDER)[keyof typeof GENDER];

export const MUSCLE_GROUP = {
  // Klatka piersiowa
  UPPER_CHEST: 'UPPER_CHEST',
  MIDDLE_CHEST: 'MIDDLE_CHEST',
  LOWER_CHEST: 'LOWER_CHEST',

  // Plecy
  UPPER_BACK: 'UPPER_BACK',
  MIDDLE_BACK: 'MIDDLE_BACK',
  LOWER_BACK: 'LOWER_BACK',
  LATS: 'LATS',
  TRAPS: 'TRAPS',

  // Barki
  FRONT_DELTS: 'FRONT_DELTS',
  SIDE_DELTS: 'SIDE_DELTS',
  REAR_DELTS: 'REAR_DELTS',

  // Ramiona
  BICEPS: 'BICEPS',
  TRICEPS: 'TRICEPS',
  FOREARMS: 'FOREARMS',

  // Nogi
  QUADS: 'QUADS',
  HAMSTRINGS: 'HAMSTRINGS',
  GLUTES: 'GLUTES',
  CALVES: 'CALVES',
  HIP_FLEXORS: 'HIP_FLEXORS',
  ADDUCTORS: 'ADDUCTORS',
  ABDUCTORS: 'ABDUCTORS',

  // Brzuch
  ABS: 'ABS',
  OBLIQUES: 'OBLIQUES',
  CORE: 'CORE',
};

export type MuscleGroup = (typeof MUSCLE_GROUP)[keyof typeof MUSCLE_GROUP];
