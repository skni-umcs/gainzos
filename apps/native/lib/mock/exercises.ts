import type { ExerciseDTO } from '@gainzos/types';
import { MUSCLE_GROUP, type MuscleGroup } from '@gainzos/constants';
import { EXERCISE_TYPES } from './exercise-types';
import { PLACEHOLDER_MEDIA } from './media';
import type { Force } from './labels';

const typeById = (id: number) => EXERCISE_TYPES.find((t) => t.id === id)!;

type ExerciseSeed = {
  id: string;
  name: string;
  typeId: number;
  force: Force;
  primary: MuscleGroup;
  secondary: MuscleGroup;
  description: string;
};

const SEEDS: ExerciseSeed[] = [
  {
    id: 'bench',
    name: 'Barbell Bench Press',
    typeId: 1,
    force: 'Push',
    primary: MUSCLE_GROUP.MIDDLE_CHEST,
    secondary: MUSCLE_GROUP.TRICEPS,
    description:
      'Lie flat on the bench, grip slightly wider than shoulders, lower the bar to mid-chest and press up under control.',
  },
  {
    id: 'incline',
    name: 'Incline Dumbbell Press',
    typeId: 1,
    force: 'Push',
    primary: MUSCLE_GROUP.UPPER_CHEST,
    secondary: MUSCLE_GROUP.FRONT_DELTS,
    description: 'Set the bench to ~30°. Press dumbbells from shoulder level to lockout, keeping elbows at 45°.',
  },
  {
    id: 'fly',
    name: 'Cable Fly',
    typeId: 1,
    force: 'Push',
    primary: MUSCLE_GROUP.LOWER_CHEST,
    secondary: MUSCLE_GROUP.FRONT_DELTS,
    description: 'Hinge slightly forward, sweep handles together in a wide arc, squeeze at the midline.',
  },
  {
    id: 'pullup',
    name: 'Pull-Up',
    typeId: 2,
    force: 'Pull',
    primary: MUSCLE_GROUP.LATS,
    secondary: MUSCLE_GROUP.BICEPS,
    description: 'Hang from the bar, pull the chest toward the bar by driving elbows down and back.',
  },
  {
    id: 'row',
    name: 'Barbell Row',
    typeId: 2,
    force: 'Pull',
    primary: MUSCLE_GROUP.MIDDLE_BACK,
    secondary: MUSCLE_GROUP.LATS,
    description: 'Hinge to ~45°, row the bar to your lower ribs, keep a neutral spine throughout.',
  },
  {
    id: 'pulldown',
    name: 'Lat Pulldown',
    typeId: 2,
    force: 'Pull',
    primary: MUSCLE_GROUP.LATS,
    secondary: MUSCLE_GROUP.BICEPS,
    description: 'Pull the bar to the upper chest, drive elbows down, control the eccentric.',
  },
  {
    id: 'squat',
    name: 'Back Squat',
    typeId: 3,
    force: 'Push',
    primary: MUSCLE_GROUP.QUADS,
    secondary: MUSCLE_GROUP.GLUTES,
    description: 'Bar on upper traps, break at hips and knees together, descend to depth, drive up.',
  },
  {
    id: 'rdl',
    name: 'Romanian Deadlift',
    typeId: 3,
    force: 'Pull',
    primary: MUSCLE_GROUP.HAMSTRINGS,
    secondary: MUSCLE_GROUP.GLUTES,
    description:
      'Soft knees, hinge at the hips, slide the bar down the thighs, feel the stretch, drive hips forward.',
  },
  {
    id: 'legpress',
    name: 'Leg Press',
    typeId: 3,
    force: 'Push',
    primary: MUSCLE_GROUP.QUADS,
    secondary: MUSCLE_GROUP.GLUTES,
    description: 'Feet shoulder-width on the platform, lower to 90°, press without locking the knees.',
  },
  {
    id: 'ohp',
    name: 'Overhead Press',
    typeId: 4,
    force: 'Push',
    primary: MUSCLE_GROUP.FRONT_DELTS,
    secondary: MUSCLE_GROUP.TRICEPS,
    description: 'Press the bar overhead from the front rack, brace the core, finish with biceps by the ears.',
  },
  {
    id: 'lateral',
    name: 'Lateral Raise',
    typeId: 4,
    force: 'Pull',
    primary: MUSCLE_GROUP.SIDE_DELTS,
    secondary: MUSCLE_GROUP.TRAPS,
    description: 'Slight bend in elbows, raise dumbbells to shoulder height, lead with the elbows.',
  },
  {
    id: 'curl',
    name: 'Dumbbell Curl',
    typeId: 5,
    force: 'Pull',
    primary: MUSCLE_GROUP.BICEPS,
    secondary: MUSCLE_GROUP.FOREARMS,
    description: 'Elbows pinned to sides, curl the dumbbells, supinate at the top, lower under control.',
  },
  {
    id: 'pushdown',
    name: 'Triceps Pushdown',
    typeId: 5,
    force: 'Push',
    primary: MUSCLE_GROUP.TRICEPS,
    secondary: MUSCLE_GROUP.FOREARMS,
    description: 'Pin elbows to your sides, extend the rope to lockout, spread at the bottom.',
  },
  {
    id: 'plank',
    name: 'Plank',
    typeId: 6,
    force: 'Static',
    primary: MUSCLE_GROUP.ABS,
    secondary: MUSCLE_GROUP.CORE,
    description: 'Forearms down, body in a straight line, brace abs and glutes, hold the position.',
  },
  {
    id: 'cablecrunch',
    name: 'Cable Crunch',
    typeId: 6,
    force: 'Pull',
    primary: MUSCLE_GROUP.ABS,
    secondary: MUSCLE_GROUP.OBLIQUES,
    description: 'Kneel beneath the rope, crunch the ribs toward the pelvis, control back to start.',
  },
];

// Note: ExerciseDTO uses the field name `destription` (a typo in the shared
// @gainzos/types contract). We conform to it rather than diverging.
export const EXERCISES: ExerciseDTO[] = SEEDS.map((s) => ({
  id: s.id,
  name: s.name,
  destription: s.description,
  force: s.force,
  primaryMuscle: s.primary,
  secondaryMuscle: s.secondary,
  exerciseType: typeById(s.typeId),
  image: PLACEHOLDER_MEDIA,
  video: PLACEHOLDER_MEDIA,
}));

export const exerciseById = (id: string): ExerciseDTO | undefined =>
  EXERCISES.find((e) => e.id === id);

export const exercisesByType = (typeId: number): ExerciseDTO[] =>
  EXERCISES.filter((e) => e.exerciseType.id === typeId);

/**
 * Design-only concept: whether an exercise has a demo video. Every ExerciseDTO
 * carries a `video` MediaDTO, so it can't express "no video" — track it here.
 */
export const HAS_VIDEO: Record<string, boolean> = {
  bench: true,
  incline: true,
  fly: false,
  pullup: true,
  row: true,
  pulldown: false,
  squat: true,
  rdl: true,
  legpress: false,
  ohp: true,
  lateral: false,
  curl: true,
  pushdown: false,
  plank: false,
  cablecrunch: false,
};

/** Design-only concept: numbered form cues (no DTO field exists for these). */
export const CUES: Record<string, string[]> = {
  bench: [
    'Plant feet, squeeze shoulder blades back and down',
    'Lower the bar to mid-chest with elbows ~45°',
    'Press up and slightly back to lockout',
  ],
  incline: [
    'Set the bench to roughly 30°',
    'Press from shoulder level to lockout',
    'Lower under control, feel the upper-chest stretch',
  ],
  fly: [
    'Soft bend in the elbows, hinge slightly forward',
    'Sweep the handles together in a wide arc',
    'Squeeze hard at the midline, resist on the way back',
  ],
  pullup: [
    'Start from a full dead hang',
    'Drive elbows down and back toward the floor',
    'Pull chest to the bar, lower with control',
  ],
  row: [
    'Hinge to ~45° with a neutral spine',
    'Row the bar to your lower ribs',
    'Pause, then lower without rounding',
  ],
  pulldown: [
    'Set a secure thigh pad, grip just outside shoulders',
    'Pull the bar to the upper chest',
    'Control the eccentric all the way up',
  ],
  squat: [
    'Bar on upper traps, brace your core',
    'Break at hips and knees together to depth',
    'Drive through mid-foot to stand tall',
  ],
  rdl: [
    'Soft knees, bar close to the thighs',
    'Hinge at the hips, push them back',
    'Feel the hamstring stretch, then drive hips forward',
  ],
  legpress: [
    'Feet shoulder-width on the platform',
    'Lower until knees reach ~90°',
    'Press without locking the knees hard',
  ],
  ohp: [
    'Brace core and glutes, bar in the front rack',
    'Press overhead, move your head through',
    'Finish with biceps by the ears',
  ],
  lateral: [
    'Slight bend in the elbows, lead with the elbows',
    'Raise to shoulder height, no higher',
    'Lower slowly, keep tension on the side delts',
  ],
  curl: ['Pin elbows to your sides', 'Curl up and supinate at the top', 'Lower under control, no swinging'],
  pushdown: [
    'Pin elbows, lean in slightly',
    'Extend the rope to full lockout',
    'Spread the rope at the bottom, control back up',
  ],
  plank: [
    'Forearms down, elbows under shoulders',
    'Body in one straight line, squeeze glutes',
    'Brace abs and breathe steadily through the hold',
  ],
  cablecrunch: [
    'Kneel under the rope, hips fixed',
    'Crunch ribs toward the pelvis',
    'Control back up, keep tension on the abs',
  ],
};
