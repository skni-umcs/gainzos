import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, radius } from '@/theme';

interface BarProps {
  value: number;
  max?: number;
  height?: number;
}

/** Horizontal progress bar with the accent gradient fill. */
export function Bar({ value, max = 100, height = 8 }: BarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <View style={[styles.track, { height, borderRadius: radius.pill }]}>
      <LinearGradient
        colors={gradients.accent}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ width: `${pct}%`, height: '100%', borderRadius: radius.pill }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', backgroundColor: colors.surface3, overflow: 'hidden' },
});
