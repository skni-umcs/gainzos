import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { useWorkoutStore } from '@/lib/store/workout';

/**
 * Drives the workout state machine. A 1s interval advances the store to the
 * current clock; an `AppState` listener forces an immediate catch-up the moment
 * the app returns to the foreground, so a session backgrounded mid-rest (or
 * across several auto-advanced sets) resyncs instantly instead of waiting out
 * the next interval. The store's `tick` is a no-op when no timer is running.
 *
 * Mount this once, at the active-workout screen root.
 */
export function useWorkoutTimer() {
  const tick = useWorkoutStore((s) => s.tick);

  useEffect(() => {
    tick();
    const interval = setInterval(tick, 1000);
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') tick();
    });
    return () => {
      clearInterval(interval);
      sub.remove();
    };
  }, [tick]);
}

/**
 * A clock that re-renders on an interval, for deriving a countdown from an
 * absolute `endsAt` deadline. Pass `active: false` to pause it (e.g. no timer
 * running) so idle screens don't re-render. Also resyncs on foreground.
 */
export function useNow(active = true, intervalMs = 500): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!active) return;
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), intervalMs);
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') setNow(Date.now());
    });
    return () => {
      clearInterval(interval);
      sub.remove();
    };
  }, [active, intervalMs]);

  return now;
}
