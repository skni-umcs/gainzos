import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fontFamily, gradients } from '@/theme';
import { Text } from './text';

interface MiniBarsProps {
  data: number[];
  height?: number;
  labels?: string[];
  /** Highlight the final bar with the accent gradient. */
  highlightLast?: boolean;
}

/** Lightweight vertical bar chart (no SVG); last bar can be accent-highlighted. */
export function MiniBars({ data, height = 92, labels, highlightLast }: MiniBarsProps) {
  const max = Math.max(...data, 1);
  return (
    <View style={[styles.row, { height }]}>
      {data.map((v, i) => {
        const isLast = i === data.length - 1;
        const barHeight = `${(v / max) * 100}%` as const;
        return (
          <View key={i} style={styles.col}>
            {highlightLast && isLast ? (
              <LinearGradient
                colors={gradients.accent}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={[styles.bar, { height: barHeight }]}
              />
            ) : (
              <View style={[styles.bar, { height: barHeight, backgroundColor: colors.surface4 }]} />
            )}
            {labels && <Text style={styles.label}>{labels[i]}</Text>}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 5 },
  col: { flex: 1, height: '100%', justifyContent: 'flex-end', alignItems: 'center', gap: 6 },
  bar: { width: '100%', borderRadius: 5 },
  label: { fontFamily: fontFamily.bodySemiBold, fontSize: 9, color: colors.textFaint },
});
