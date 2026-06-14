/**
 * Accent gradient stop arrays for `expo-linear-gradient`.
 * Use with `start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}` for the 135° look.
 */
export const gradients = {
  // light → deep
  accent: ['#db90ff', '#894bff'] as const,
  // subtle accent-tinted fill (cards, empty-state icons)
  accentSoft: ['rgba(219,144,255,0.18)', 'rgba(137,75,255,0.10)'] as const,
} as const;
