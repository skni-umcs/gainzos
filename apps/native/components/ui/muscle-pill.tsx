import { View, StyleSheet } from 'react-native';
import { colors, fontFamily, radius } from '@/theme';
import { Text } from './text';

interface MusclePillProps {
  label: string;
  /** Secondary muscles render in a muted (non-accent) style. */
  secondary?: boolean;
}

export function MusclePill({ label, secondary }: MusclePillProps) {
  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: secondary ? colors.surface3 : colors.accentSoft,
          borderColor: secondary ? 'transparent' : colors.accentLine,
        },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: secondary ? colors.textMut : colors.accent }]} />
      <Text style={[styles.label, { color: secondary ? colors.text2 : colors.accentBr }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: { width: 6, height: 6, borderRadius: 999 },
  label: { fontFamily: fontFamily.bodySemiBold, fontSize: 12 },
});
