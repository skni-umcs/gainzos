import { Platform } from 'react-native';
import { colors } from './colors';

type Shadow = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

const make = (color: string, height: number, radius: number, opacity: number, elevation: number): Shadow => ({
  shadowColor: color,
  shadowOffset: { width: 0, height },
  shadowOpacity: Platform.OS === 'ios' ? opacity : opacity * 0.9,
  shadowRadius: radius,
  elevation,
});

/** Elevation presets, mirroring the design's `--sh-*` and accent glow. */
export const shadows = {
  sh1: make('#000000', 2, 8, 0.35, 2),
  sh2: make('#000000', 12, 24, 0.5, 8),
  sh3: make('#000000', 24, 36, 0.6, 16),
  accentGlow: make(colors.accentDeep, 10, 24, 0.55, 10),
} as const;
