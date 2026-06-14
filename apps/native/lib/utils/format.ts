/** Formatting helpers ported from the design prototype. */

/** Seconds → `m:ss` (e.g. 125 → "2:05"). */
export function fmtDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** Seconds → clock, dropping the hour when zero (e.g. 3725 → "1:02:05", 125 → "2:05"). */
export function fmtClock(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const head = h ? `${h}:${String(m).padStart(2, '0')}` : `${m}`;
  return `${head}:${String(s).padStart(2, '0')}`;
}

/** ISO date string → relative label ("Today", "Yesterday", "3 days ago", "2 wk ago"). */
export function relDate(iso: string, now: Date = new Date()): string {
  const diff = Math.round((now.getTime() - new Date(iso).getTime()) / 864e5);
  if (diff <= 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  return `${Math.round(diff / 7)} wk ago`;
}

/** Whole minutes from seconds. */
export function toMinutes(totalSeconds: number): number {
  return Math.round(totalSeconds / 60);
}
