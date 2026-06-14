import type { TextStyle } from 'react-native';
import { colors } from './colors';

/**
 * Loaded font families (see `app/_layout.tsx` `useFonts`).
 * Saira Condensed — display & numbers; Hanken Grotesk — body.
 */
export const fontFamily = {
  // Saira Condensed (display / power numbers)
  displayBold: 'SairaCondensed_700Bold',
  displaySemiBold: 'SairaCondensed_600SemiBold',
  displayMedium: 'SairaCondensed_500Medium',
  // Hanken Grotesk (body / labels)
  body: 'HankenGrotesk_400Regular',
  bodyMedium: 'HankenGrotesk_500Medium',
  bodySemiBold: 'HankenGrotesk_600SemiBold',
  bodyBold: 'HankenGrotesk_700Bold',
  bodyExtraBold: 'HankenGrotesk_800ExtraBold',
} as const;

/**
 * Typography presets, mirroring the design's type helpers.
 * Spread into a StyleSheet entry, e.g. `{ ...typography.h1, color: colors.text }`.
 */
export const typography = {
  display: {
    fontFamily: fontFamily.displayBold,
    letterSpacing: -0.3,
  },
  num: {
    fontFamily: fontFamily.displayBold,
    letterSpacing: -0.3,
    fontVariant: ['tabular-nums'],
  },
  h1: { fontFamily: fontFamily.displayBold, fontSize: 30, letterSpacing: -0.3 },
  h2: { fontFamily: fontFamily.displaySemiBold, fontSize: 23 },
  h3: { fontFamily: fontFamily.bodyBold, fontSize: 17, letterSpacing: -0.2 },
  body: { fontFamily: fontFamily.body, fontSize: 15, lineHeight: 22, color: colors.text2 },
  small: { fontFamily: fontFamily.body, fontSize: 13, lineHeight: 19, color: colors.textMut },
  eyebrow: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.textMut,
  },
  label: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textMut,
  },
} satisfies Record<string, TextStyle>;
