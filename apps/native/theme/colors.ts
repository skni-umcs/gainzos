/**
 * GainzOS — "Kinetic Nocturne" color tokens.
 * Depth comes from layered surface shades, not borders.
 * Purple is the only decorative color; semantic colors are reserved for state.
 */
export const colors = {
  // Surface tiers (depth via layered shades)
  bg: '#0e0e10', // app base, near-black
  surface1: '#161619', // cards on base
  surface2: '#1e1e23', // raised / nested cards
  surface3: '#292931', // input fills, chips, wells
  surface4: '#34343d', // pressed / hover-raised
  scrim: 'rgba(8,8,10,0.72)',

  // Hairlines (translucent white)
  line: 'rgba(255,255,255,0.06)',
  line2: 'rgba(255,255,255,0.10)',
  lineStrong: 'rgba(255,255,255,0.16)',

  // Text
  text: '#f6f5f8', // bright headings
  text2: '#b6b4c2', // secondary
  textMut: '#7b7989', // muted / captions
  textFaint: '#54525e', // disabled / placeholder

  // Brand accent — purple only
  accent: '#ce75fa',
  accentBr: '#db90ff', // lighter
  accentDeep: '#894bff', // deeper, CTA gradient end
  accentSoft: 'rgba(206,117,250,0.13)',
  accentLine: 'rgba(206,117,250,0.34)',
  onAccent: '#15071f', // dark text on bright purple

  // Semantic (status only, never decoration)
  success: '#45d483',
  successSoft: 'rgba(69,212,131,0.14)',
  error: '#fb6f84',
  errorSoft: 'rgba(251,111,132,0.14)',
  warning: '#f6b748',
  warningSoft: 'rgba(246,183,72,0.14)',

  white: '#ffffff',
} as const;

export type ColorToken = keyof typeof colors;
