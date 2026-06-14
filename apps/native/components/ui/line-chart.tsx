import { useState } from 'react';
import { View, type LayoutChangeEvent } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors } from '@/theme';

interface LineChartProps {
  data: number[];
  height?: number;
  color?: string;
  fill?: boolean;
}

/** Smooth-ish line/area chart that stretches to its container width. */
export function LineChart({ data, height = 120, color = colors.accentBr, fill = true }: LineChartProps) {
  const [width, setWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  const pad = 8;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = data.length > 1 ? (width - pad * 2) / (data.length - 1) : 0;
  const points = data.map((v, i) => [pad + i * step, height - pad - ((v - min) / range) * (height - pad * 2)]);

  const line = points.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = points.length
    ? `${line} L${points[points.length - 1][0]} ${height} L${points[0][0]} ${height} Z`
    : '';
  const last = points[points.length - 1];

  return (
    <View onLayout={onLayout} style={{ height }}>
      {width > 0 && (
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="lcFill" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={color} stopOpacity={0.32} />
              <Stop offset="100%" stopColor={color} stopOpacity={0} />
            </LinearGradient>
          </Defs>
          {fill && <Path d={area} fill="url(#lcFill)" />}
          <Path d={line} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          {last && <Circle cx={last[0]} cy={last[1]} r={4} fill={color} stroke={colors.bg} strokeWidth={2.5} />}
        </Svg>
      )}
    </View>
  );
}
