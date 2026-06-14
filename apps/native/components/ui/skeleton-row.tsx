import { useEffect, useState } from 'react';
import { Animated, View, StyleSheet, type DimensionValue } from 'react-native';
import { colors, radius } from '@/theme';

/** A single shimmering block. */
export function Skeleton({
  width,
  height,
  borderRadius = radius.md,
}: {
  width: DimensionValue;
  height: number;
  borderRadius?: number;
}) {
  const [pulse] = useState(() => new Animated.Value(0.4));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 750, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 750, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <Animated.View
      style={{ width, height, borderRadius, backgroundColor: colors.surface2, opacity: pulse }}
    />
  );
}

/** List-row placeholder: thumbnail + two text lines. */
export function SkeletonRow() {
  return (
    <View style={styles.row}>
      <Skeleton width={56} height={56} borderRadius={radius.md} />
      <View style={styles.lines}>
        <Skeleton width="62%" height={14} borderRadius={6} />
        <Skeleton width="40%" height={11} borderRadius={6} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 10 },
  lines: { flex: 1, gap: 8 },
});
