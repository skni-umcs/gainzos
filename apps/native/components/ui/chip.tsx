import { Pressable, StyleSheet } from 'react-native';
import { colors, fontFamily, radius } from '@/theme';
import { Text } from './text';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

/** Pill-shaped filter chip; accent-tinted when active. */
export function Chip({ label, active, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.active]}
    >
      <Text style={[styles.label, { color: active ? colors.accentBr : colors.text2 }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.surface3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  active: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accentLine,
  },
  label: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 12.5,
  },
});
