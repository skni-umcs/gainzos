import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors } from '@/theme';

/** Purple-family segment palette, mirroring the design's donut. */
export const DONUT_COLORS = ['#db90ff', '#a96bff', '#894bff', '#6f5bd8', '#8a7fe0', '#b9a8f0'];

interface DonutProps {
  data: { pct: number }[];
  size?: number;
  stroke?: number;
  /** Centered overlay (e.g. a count). */
  children?: React.ReactNode;
}

/** Ring-style proportional chart driven by percentage slices. */
export function Donut({ data, size = 150, stroke = 22, children }: DonutProps) {
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const lengths = data.map((d) => (d.pct / 100) * circumference);
  // Cumulative start offset for each slice (pure — no mutation during render).
  const offsets = lengths.map((_, i) => lengths.slice(0, i).reduce((a, b) => a + b, 0));

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={styles.rotate}>
        <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={colors.surface3} strokeWidth={stroke} />
        <G>
          {data.map((d, i) => (
            <Circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
              strokeWidth={stroke}
              strokeDasharray={`${lengths[i]} ${circumference - lengths[i]}`}
              strokeDashoffset={-offsets[i]}
            />
          ))}
        </G>
      </Svg>
      {children != null && <View style={styles.center}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  rotate: { transform: [{ rotate: '-90deg' }] },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
