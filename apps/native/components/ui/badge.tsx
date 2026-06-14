import type { ReactNode } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { colors, fontFamily, radius } from '@/theme';
import { Text } from './text';

type Tone = 'neutral' | 'accent' | 'success' | 'error' | 'warning';

interface BadgeProps {
  label: string;
  tone?: Tone;
  /** Optional leading icon (e.g. a lucide icon element). */
  icon?: ReactNode;
  uppercase?: boolean;
  style?: StyleProp<ViewStyle>;
}

const TONE: Record<Tone, { bg: string; fg: string }> = {
  neutral: { bg: colors.surface3, fg: colors.text2 },
  accent: { bg: colors.accentSoft, fg: colors.accentBr },
  success: { bg: colors.successSoft, fg: colors.success },
  error: { bg: colors.errorSoft, fg: colors.error },
  warning: { bg: colors.warningSoft, fg: colors.warning },
};

/** Compact status pill. Reserve colored tones for state, not decoration. */
export function Badge({ label, tone = 'neutral', icon, uppercase = true, style }: BadgeProps) {
  const { bg, fg } = TONE[tone];
  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      {icon}
      <Text
        style={[
          styles.label,
          { color: fg, textTransform: uppercase ? 'uppercase' : 'none' },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radius.sm,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 11,
    letterSpacing: 0.5,
  },
});
