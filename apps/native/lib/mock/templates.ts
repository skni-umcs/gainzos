import type { WorkoutTemplateDTO, WorkoutItemDTO } from '@gainzos/types';
import type { MuscleGroup } from '@gainzos/constants';
import { exerciseById } from './exercises';

type ItemSeed = {
  ex: string;
  sets: number;
  reps: number;
  durationSeconds?: number;
  restTimeSeconds: number;
  weight: number;
};

let itemIdSeq = 1;

function buildItems(seeds: ItemSeed[]): WorkoutItemDTO[] {
  return seeds.map((s) => {
    const exercise = exerciseById(s.ex);
    if (!exercise) throw new Error(`Unknown mock exercise id: ${s.ex}`);
    return {
      id: itemIdSeq++,
      exercise,
      sets: s.sets,
      reps: s.reps,
      durationSeconds: s.durationSeconds ?? 0,
      restTimeSeconds: s.restTimeSeconds,
      weight: s.weight,
    };
  });
}

/** Unique muscles worked by a template's items (primary + secondary), preserving order. */
export function muscleGroupsOf(items: WorkoutItemDTO[]): MuscleGroup[] {
  const seen = new Set<MuscleGroup>();
  const out: MuscleGroup[] = [];
  for (const item of items) {
    for (const m of [item.exercise.primaryMuscle, item.exercise.secondaryMuscle]) {
      if (!seen.has(m)) {
        seen.add(m);
        out.push(m);
      }
    }
  }
  return out;
}

type TemplateSeed = {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  items: ItemSeed[];
};

const SEEDS: TemplateSeed[] = [
  {
    id: 1,
    name: 'Push Day A',
    description: 'Chest-led horizontal & vertical pressing with triceps finisher.',
    isPublic: true,
    items: [
      { ex: 'bench', sets: 4, reps: 8, restTimeSeconds: 120, weight: 80 },
      { ex: 'incline', sets: 3, reps: 10, restTimeSeconds: 90, weight: 28 },
      { ex: 'ohp', sets: 3, reps: 8, restTimeSeconds: 90, weight: 45 },
      { ex: 'fly', sets: 3, reps: 12, restTimeSeconds: 60, weight: 16 },
      { ex: 'pushdown', sets: 3, reps: 14, restTimeSeconds: 60, weight: 30 },
    ],
  },
  {
    id: 2,
    name: 'Pull Day A',
    description: 'Vertical & horizontal pulling, biceps to finish.',
    isPublic: false,
    items: [
      { ex: 'pullup', sets: 4, reps: 8, restTimeSeconds: 120, weight: 0 },
      { ex: 'row', sets: 4, reps: 10, restTimeSeconds: 90, weight: 70 },
      { ex: 'pulldown', sets: 3, reps: 12, restTimeSeconds: 75, weight: 55 },
      { ex: 'curl', sets: 3, reps: 12, restTimeSeconds: 60, weight: 14 },
    ],
  },
  {
    id: 3,
    name: 'Leg Day',
    description: 'Squat-focused with posterior-chain accessory work.',
    isPublic: true,
    items: [
      { ex: 'squat', sets: 5, reps: 5, restTimeSeconds: 150, weight: 110 },
      { ex: 'rdl', sets: 3, reps: 8, restTimeSeconds: 120, weight: 90 },
      { ex: 'legpress', sets: 3, reps: 12, restTimeSeconds: 90, weight: 180 },
      { ex: 'plank', sets: 3, reps: 0, durationSeconds: 45, restTimeSeconds: 45, weight: 0 },
    ],
  },
  {
    id: 4,
    name: 'Upper Body Power',
    description: 'Full upper session blending push and pull.',
    isPublic: true,
    items: [
      { ex: 'bench', sets: 4, reps: 6, restTimeSeconds: 120, weight: 85 },
      { ex: 'row', sets: 4, reps: 8, restTimeSeconds: 90, weight: 72 },
      { ex: 'ohp', sets: 3, reps: 8, restTimeSeconds: 90, weight: 45 },
      { ex: 'lateral', sets: 3, reps: 15, restTimeSeconds: 45, weight: 10 },
    ],
  },
];

export const TEMPLATES: WorkoutTemplateDTO[] = SEEDS.map((s) => {
  const items = buildItems(s.items);
  return {
    id: s.id,
    name: s.name,
    description: s.description,
    muscleGroups: muscleGroupsOf(items),
    ownerId: 1,
    isPublic: s.isPublic,
    items,
  };
});

export const templateById = (id: number): WorkoutTemplateDTO | undefined =>
  TEMPLATES.find((t) => t.id === id);

let templateIdSeq = Math.max(0, ...SEEDS.map((s) => s.id));

/** Stable, unique id for a freshly built draft workout item. */
export const nextWorkoutItemId = (): number => itemIdSeq++;

/**
 * Persist a draft into the in-memory mock layer — inserts a new template (when
 * `id` is absent) or replaces the existing one. `muscleGroups` is recomputed
 * from the items so it always matches. Returns the saved template.
 */
export function upsertTemplate(draft: {
  id?: number;
  name: string;
  description: string;
  items: WorkoutItemDTO[];
}): WorkoutTemplateDTO {
  const existing = draft.id != null ? templateById(draft.id) : undefined;
  const saved: WorkoutTemplateDTO = {
    id: existing?.id ?? ++templateIdSeq,
    name: draft.name.trim(),
    description: draft.description.trim(),
    muscleGroups: muscleGroupsOf(draft.items),
    ownerId: existing?.ownerId ?? 1,
    isPublic: existing?.isPublic ?? false,
    items: draft.items,
  };

  if (existing) {
    TEMPLATES[TEMPLATES.indexOf(existing)] = saved;
  } else {
    TEMPLATES.unshift(saved);
  }
  return saved;
}

/** Total set count across a template's items. */
export const templateSetCount = (t: WorkoutTemplateDTO): number =>
  t.items.reduce((acc, i) => acc + i.sets, 0);

/** Rough estimated minutes (sets × (rest + ~40s of work)). */
export const templateEstMinutes = (t: WorkoutTemplateDTO): number =>
  Math.round(t.items.reduce((acc, i) => acc + i.sets * (i.restTimeSeconds + 40), 0) / 60);
