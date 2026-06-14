import { Pressable, View, StyleSheet } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { colors, fontFamily, radius } from '@/theme';
import { Text } from '@/components/ui';

interface StepperProps {
  value: number;
  onChange: (next: number) => void;
  step?: number;
  min?: number;
  max?: number;
  /** Render the value with a unit/format (e.g. `(v) => `${v}s``). */
  format?: (value: number) => string;
}

/** Compact −/+ numeric control. The `+` is the "add a set" affordance for sets. */
export function Stepper({ value, onChange, step = 1, min = 0, max = 999, format }: StepperProps) {
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));
  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <View style={styles.row}>
      <Pressable
        onPress={dec}
        disabled={atMin}
        hitSlop={6}
        style={({ pressed }) => [styles.btn, atMin && styles.btnDisabled, pressed && styles.pressed]}
      >
        <Minus size={16} strokeWidth={2.6} color={atMin ? colors.textFaint : colors.text} />
      </Pressable>
      <Text style={styles.value}>{format ? format(value) : value}</Text>
      <Pressable
        onPress={inc}
        disabled={atMax}
        hitSlop={6}
        style={({ pressed }) => [styles.btn, atMax && styles.btnDisabled, pressed && styles.pressed]}
      >
        <Plus size={16} strokeWidth={2.6} color={atMax ? colors.textFaint : colors.accentBr} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  btn: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.surface4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: { backgroundColor: colors.surface3 },
  pressed: { transform: [{ scale: 0.9 }], opacity: 0.85 },
  value: {
    fontFamily: fontFamily.displayBold,
    fontVariant: ['tabular-nums'],
    fontSize: 16,
    color: colors.text,
    minWidth: 46,
    textAlign: 'center',
  },
});
