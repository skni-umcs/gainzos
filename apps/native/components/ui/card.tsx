import type { ReactNode } from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { colors, radius, spacing } from '@/theme';

interface CardProps {
  children: ReactNode;
  /** Surface tier: `1` (default, on base), `2` (raised/nested), `inset` (well). */
  tier?: '1' | '2' | 'inset';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** Surface container — depth via background tier, with a faint hairline. */
export function Card({ children, tier = '1', onPress, style }: CardProps) {
  const tierStyle =
    tier === '2' ? styles.tier2 : tier === 'inset' ? styles.inset : styles.tier1;

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.base, tierStyle, pressed && styles.pressed, style]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={[styles.base, tierStyle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.xl,
  },
  tier1: { backgroundColor: colors.surface1, borderColor: colors.line },
  tier2: { backgroundColor: colors.surface2, borderColor: colors.line },
  inset: { backgroundColor: colors.surface3, borderColor: 'transparent' },
  pressed: { opacity: 0.85 },
});
