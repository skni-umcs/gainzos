import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';

import type { ExerciseDTO, WorkoutItemDTO, WorkoutTemplateDTO } from '@gainzos/types';
import { recordWorkout, templateById, upsertTemplate } from '@/lib/mock';

/**
 * Active-workout session state. This is purely client-side UI state — it tracks
 * per-set completion and the values actually logged, which the server DTOs do
 * not model — so it deliberately does NOT live in @gainzos/types.
 *
 * Timer design (see the catch-up loop below): we never store a counting-down
 * number. Exactly one phase is ever active, captured by `timer` as an absolute
 * `endsAt` epoch-ms deadline. Remaining time is always derived as
 * `endsAt - Date.now()`, so it self-corrects after the JS timer is paused (app
 * backgrounded) or the session is rehydrated from disk on a fresh launch.
 */

/** A set within a live session: planned targets + the values actually logged. */
export interface SessionSet {
  id: number;
  // Planned (seeded from the template).
  targetReps: number;
  targetDurationSeconds: number; // > 0 marks a timed set (plank, etc.)
  restTimeSeconds: number;
  // Logged / actual.
  reps: number;
  weight: number;
  done: boolean;
}

export interface SessionItem {
  id: number;
  exercise: ExerciseDTO;
  sets: SessionSet[];
}

type TimerPhase = 'work' | 'rest';

/** The single running timer. `phase` is the work (timed set) or rest countdown. */
export interface ActiveTimer {
  itemId: number;
  setId: number;
  phase: TimerPhase;
  endsAt: number; // epoch ms
}

export interface WorkoutSession {
  templateId: number | null;
  name: string;
  startedAt: number; // epoch ms
  notes: string;
  items: SessionItem[];
  /** The one running countdown, or null when idle (e.g. mid rep-based set). */
  timer: ActiveTimer | null;
  /** Exercise currently in auto-advance mode, or null. Survives the idle gap
   *  while a rep-based set waits for a manual "done". */
  autoItemId: number | null;
}

/** Summary of a finished session, shown on the post-workout screen. */
export interface WorkoutSummary {
  name: string;
  templateId: number | null;
  completedAt: number; // epoch ms
  durationSeconds: number;
  volume: number;
  totalSets: number;
  doneSets: number;
  exercises: number;
  totalReps: number;
  notes: string;
}

/** A template change implied by a finished session, offered to the user to save. */
export interface PendingTemplateUpdate {
  templateId: number;
  name: string;
  description: string;
  items: WorkoutItemDTO[];
}

/** A workout older than this on launch is considered abandoned and discarded. */
const WORKOUT_TTL_MS = 8 * 60 * 60 * 1000;

// ---------------------------------------------------------------------------
// Pure state-machine helpers — operate on a session and return a new session.
// They never read the clock except where a transition is anchored to one; the
// catch-up loop chains transitions off each timer's own `endsAt` so a resume
// can't stretch a rest period.
// ---------------------------------------------------------------------------

const findItem = (s: WorkoutSession, itemId: number) =>
  s.items.find((i) => i.id === itemId);

const nextPendingSet = (item: SessionItem): SessionSet | undefined =>
  item.sets.find((set) => !set.done);

/** Rough seconds to perform a rep-based set when auto mode needs a work phase. */
const SECONDS_PER_REP = 3;

/**
 * The work-phase duration for auto-advance. Timed sets use their own duration;
 * rep-based sets — which have no clock — get an estimate from their rep count
 * (clamped to a sane range) so auto mode can drive every set hands-free.
 */
function autoWorkSeconds(set: SessionSet): number {
  if (set.targetDurationSeconds > 0) return set.targetDurationSeconds;
  return Math.min(120, Math.max(20, set.targetReps * SECONDS_PER_REP || 30));
}

const mapSet = (
  s: WorkoutSession,
  itemId: number,
  setId: number,
  fn: (set: SessionSet) => SessionSet,
): WorkoutSession => ({
  ...s,
  items: s.items.map((item) =>
    item.id === itemId
      ? { ...item, sets: item.sets.map((set) => (set.id === setId ? fn(set) : set)) }
      : item,
  ),
});

/**
 * Resolve the moment a rest period ends. Clears the timer and, when the rest's
 * exercise is in auto mode, advances to the next pending set by starting its
 * work countdown anchored at `instant` (rep-based sets use an estimated work
 * duration so auto mode runs every set hands-free). With no sets left, the
 * exercise disarms.
 */
function resolveRestEnd(s: WorkoutSession, itemId: number, instant: number): WorkoutSession {
  const base: WorkoutSession = { ...s, timer: null };
  if (base.autoItemId !== itemId) return base;

  const item = findItem(base, itemId);
  const next = item && nextPendingSet(item);
  if (!next) return { ...base, autoItemId: null };

  return {
    ...base,
    timer: {
      itemId,
      setId: next.id,
      phase: 'work',
      endsAt: instant + autoWorkSeconds(next) * 1000,
    },
  };
}

/** Mark a set done and start its rest countdown anchored at `instant`. */
function completeAt(
  s: WorkoutSession,
  itemId: number,
  setId: number,
  instant: number,
): WorkoutSession {
  const marked = mapSet(s, itemId, setId, (set) => ({ ...set, done: true }));
  const item = findItem(marked, itemId);
  const set = item?.sets.find((x) => x.id === setId);
  const rest = set?.restTimeSeconds ?? 0;

  if (rest > 0) {
    return { ...marked, timer: { itemId, setId, phase: 'rest', endsAt: instant + rest * 1000 } };
  }
  return resolveRestEnd(marked, itemId, instant);
}

/** Process exactly one elapsed timer deadline, chaining off the timer's own `endsAt`. */
function step(s: WorkoutSession): WorkoutSession {
  const t = s.timer;
  if (!t) return s;
  if (t.phase === 'work') {
    // A timed work set hit its duration → complete it (its rest starts at the
    // same instant the work ended, not "now").
    return completeAt(s, t.itemId, t.setId, t.endsAt);
  }
  return resolveRestEnd(s, t.itemId, t.endsAt);
}

/** Advance through every deadline that has already passed (catch-up on resume). */
function catchUp(s: WorkoutSession, now: number): WorkoutSession {
  let cur = s;
  // Bounded by the number of sets; each step either ends or arms a future timer.
  for (let guard = 0; guard < 256; guard++) {
    const t = cur.timer;
    if (!t || t.endsAt > now) break;
    cur = step(cur);
  }
  return cur;
}

/** Comparable fingerprint of a template's items — exercise + every set's values. */
const itemsSignature = (items: WorkoutItemDTO[]): string =>
  JSON.stringify(
    items.map((i) => [
      i.exercise.id,
      i.sets.map((s) => [s.reps, s.durationSeconds, s.restTimeSeconds, s.weight]),
    ]),
  );

/**
 * Build the template update a finished session implies (per-user; public
 * templates aren't a concern here): the session's set count, weights and
 * reps/time become the template's plan. Returns null when nothing actually
 * changed, or for ad-hoc sessions with no template — so the completion screen
 * only offers the update when there's a real diff to save.
 */
function buildTemplateUpdate(session: WorkoutSession): PendingTemplateUpdate | null {
  if (session.templateId == null) return null;
  const template = templateById(session.templateId);
  if (!template) return null;

  const items: WorkoutItemDTO[] = session.items.map((item) => ({
    id: item.id,
    exercise: item.exercise,
    sets: item.sets.map((s) => ({
      id: s.id,
      reps: s.reps,
      durationSeconds: s.targetDurationSeconds,
      restTimeSeconds: s.restTimeSeconds,
      weight: s.weight,
    })),
  }));

  if (itemsSignature(items) === itemsSignature(template.items)) return null;

  return { templateId: template.id, name: template.name, description: template.description, items };
}

const buildSession = (template: WorkoutTemplateDTO, now: number): WorkoutSession => ({
  templateId: template.id,
  name: template.name,
  startedAt: now,
  notes: '',
  autoItemId: null,
  timer: null,
  items: template.items.map((item) => ({
    id: item.id,
    exercise: item.exercise,
    sets: item.sets.map((set) => ({
      id: set.id,
      targetReps: set.reps,
      targetDurationSeconds: set.durationSeconds,
      restTimeSeconds: set.restTimeSeconds,
      reps: set.reps,
      weight: set.weight,
      done: false,
    })),
  })),
});

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

interface WorkoutStore {
  session: WorkoutSession | null;
  /** Summary of the most recently finished session, for the completion screen. */
  lastSummary: WorkoutSummary | null;
  /** Template change the finished session implies, pending the user's choice. */
  pendingTemplateUpdate: PendingTemplateUpdate | null;

  /** Start a live session seeded from a template. */
  startFromTemplate: (template: WorkoutTemplateDTO) => void;
  /** Start an empty ad-hoc session (exercise picking lands later). */
  startEmpty: (name?: string) => void;

  /** Set the free-text session notes. */
  setNotes: (notes: string) => void;
  /** Edit a set's logged reps/weight without changing completion. */
  updateSetLog: (itemId: number, setId: number, patch: Partial<Pick<SessionSet, 'reps' | 'weight'>>) => void;
  /** Manually mark a set done (optionally committing its logged values) → starts rest. */
  completeSet: (itemId: number, setId: number, patch?: Partial<Pick<SessionSet, 'reps' | 'weight'>>) => void;
  /** Reopen a completed set; cancels its rest timer if that is what's running. */
  uncompleteSet: (itemId: number, setId: number) => void;
  /** Append a set to an exercise, inheriting the previous set's values. */
  addSet: (itemId: number) => void;
  removeSet: (itemId: number, setId: number) => void;

  /** Arm an exercise for auto-advance and start its next pending set. */
  startExercise: (itemId: number) => void;
  /** Disarm auto-advance (any running countdown keeps ticking). */
  stopAuto: () => void;
  /** End the current phase immediately: finish a work set early, or skip rest. */
  skipPhase: () => void;
  /** Nudge the running countdown by ±seconds (won't drop below now). */
  adjustTimer: (deltaSeconds: number) => void;

  /** Advance the state machine to the current clock — called on every tick/resume. */
  tick: () => void;
  /** Discard a stale session on launch; otherwise resync the timer to now. */
  ensureFresh: () => void;

  /** Finish: record the workout, stash a summary in `lastSummary`, clear the session. */
  finishWorkout: () => WorkoutSummary | null;
  /** Abandon without summary. */
  cancelWorkout: () => void;
  /** Drop the stored completion summary (and any unanswered template prompt). */
  clearSummary: () => void;
  /** Save the pending template change back to the user's template. */
  applyTemplateUpdate: () => void;
  /** Dismiss the pending template change without saving. */
  discardTemplateUpdate: () => void;
}

const storage = createMMKV({ id: 'gainzos-workout' });

const mmkvStorage: StateStorage = {
  getItem: (key) => storage.getString(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => {
    storage.remove(key);
  },
};

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      session: null,
      lastSummary: null,
      pendingTemplateUpdate: null,

      startFromTemplate: (template) => set({ session: buildSession(template, Date.now()) }),

      setNotes: (notes) =>
        set((s) => (s.session ? { session: { ...s.session, notes } } : s)),

      startEmpty: (name = 'Quick workout') =>
        set({
          session: {
            templateId: null,
            name,
            startedAt: Date.now(),
            notes: '',
            autoItemId: null,
            timer: null,
            items: [],
          },
        }),

      updateSetLog: (itemId, setId, patch) =>
        set((s) =>
          s.session ? { session: mapSet(s.session, itemId, setId, (x) => ({ ...x, ...patch })) } : s,
        ),

      completeSet: (itemId, setId, patch) =>
        set((s) => {
          if (!s.session) return s;
          const withLog = patch
            ? mapSet(s.session, itemId, setId, (x) => ({ ...x, ...patch }))
            : s.session;
          return { session: completeAt(withLog, itemId, setId, Date.now()) };
        }),

      uncompleteSet: (itemId, setId) =>
        set((s) => {
          if (!s.session) return s;
          const reopened = mapSet(s.session, itemId, setId, (x) => ({ ...x, done: false }));
          const t = reopened.timer;
          // If the running timer belonged to this exact set, cancel it.
          const timer = t && t.itemId === itemId && t.setId === setId ? null : reopened.timer;
          return { session: { ...reopened, timer } };
        }),

      addSet: (itemId) =>
        set((s) => {
          if (!s.session) return s;
          return {
            session: {
              ...s.session,
              items: s.session.items.map((item) => {
                if (item.id !== itemId) return item;
                const last = item.sets[item.sets.length - 1];
                const nextId = Math.max(0, ...item.sets.map((x) => x.id)) + 1;
                return {
                  ...item,
                  sets: [
                    ...item.sets,
                    {
                      id: nextId,
                      targetReps: last?.targetReps ?? 10,
                      targetDurationSeconds: last?.targetDurationSeconds ?? 0,
                      restTimeSeconds: last?.restTimeSeconds ?? 90,
                      reps: last?.reps ?? 10,
                      weight: last?.weight ?? 0,
                      done: false,
                    },
                  ],
                };
              }),
            },
          };
        }),

      removeSet: (itemId, setId) =>
        set((s) => {
          if (!s.session) return s;
          const t = s.session.timer;
          const timer = t && t.itemId === itemId && t.setId === setId ? null : t;
          return {
            session: {
              ...s.session,
              timer,
              items: s.session.items.map((item) =>
                item.id === itemId
                  ? { ...item, sets: item.sets.filter((x) => x.id !== setId) }
                  : item,
              ),
            },
          };
        }),

      startExercise: (itemId) =>
        set((s) => {
          if (!s.session) return s;
          const item = findItem(s.session, itemId);
          const next = item && nextPendingSet(item);
          if (!next) return s;
          const armed: WorkoutSession = { ...s.session, autoItemId: itemId };
          return {
            session: {
              ...armed,
              timer: {
                itemId,
                setId: next.id,
                phase: 'work',
                endsAt: Date.now() + autoWorkSeconds(next) * 1000,
              },
            },
          };
        }),

      stopAuto: () => set((s) => (s.session ? { session: { ...s.session, autoItemId: null } } : s)),

      skipPhase: () =>
        set((s) => {
          if (!s.session?.timer) return s;
          const t = s.session.timer;
          const now = Date.now();
          if (t.phase === 'work') {
            // Finish the timed set early; its rest starts now.
            return { session: completeAt(s.session, t.itemId, t.setId, now) };
          }
          return { session: resolveRestEnd(s.session, t.itemId, now) };
        }),

      adjustTimer: (deltaSeconds) =>
        set((s) => {
          if (!s.session?.timer) return s;
          const endsAt = Math.max(Date.now(), s.session.timer.endsAt + deltaSeconds * 1000);
          return { session: { ...s.session, timer: { ...s.session.timer, endsAt } } };
        }),

      tick: () =>
        set((s) => {
          if (!s.session?.timer) return s;
          const next = catchUp(s.session, Date.now());
          return next === s.session ? s : { session: next };
        }),

      ensureFresh: () =>
        set((s) => {
          if (!s.session) return s;
          if (Date.now() - s.session.startedAt > WORKOUT_TTL_MS) return { session: null };
          return { session: catchUp(s.session, Date.now()) };
        }),

      finishWorkout: () => {
        const { session } = get();
        if (!session) return null;
        let volume = 0;
        let totalSets = 0;
        let doneSets = 0;
        let totalReps = 0;
        for (const item of session.items) {
          for (const set of item.sets) {
            totalSets += 1;
            if (set.done) {
              doneSets += 1;
              volume += set.weight * set.reps;
              totalReps += set.reps;
            }
          }
        }
        const summary: WorkoutSummary = {
          name: session.name,
          templateId: session.templateId,
          completedAt: Date.now(),
          durationSeconds: Math.round((Date.now() - session.startedAt) / 1000),
          volume,
          totalSets,
          doneSets,
          exercises: session.items.length,
          totalReps,
          notes: session.notes.trim(),
        };
        // Log it to the (mock) history so it surfaces in recent activity.
        if (doneSets > 0) {
          recordWorkout({
            workoutTemplateId: session.templateId,
            volume,
            durationSeconds: summary.durationSeconds,
          });
        }
        // Surface any in-session edits as a pending update; the completion
        // screen asks the user whether to save them back to the template.
        const pendingTemplateUpdate = buildTemplateUpdate(session);
        set({ session: null, lastSummary: summary, pendingTemplateUpdate });
        return summary;
      },

      cancelWorkout: () => set({ session: null }),

      clearSummary: () => set({ lastSummary: null, pendingTemplateUpdate: null }),

      applyTemplateUpdate: () => {
        const pending = get().pendingTemplateUpdate;
        if (!pending) return;
        upsertTemplate({
          id: pending.templateId,
          name: pending.name,
          description: pending.description,
          items: pending.items,
        });
        set({ pendingTemplateUpdate: null });
      },

      discardTemplateUpdate: () => set({ pendingTemplateUpdate: null }),
    }),
    {
      name: 'workout-session',
      storage: createJSONStorage(() => mmkvStorage),
      // After a relaunch, drop an abandoned session and resync the timer to now.
      onRehydrateStorage: () => (state) => state?.ensureFresh(),
    },
  ),
);
