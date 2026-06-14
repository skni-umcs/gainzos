import { View, StyleSheet } from 'react-native';
import { colors, fontFamily } from '@/theme';
import { Card, Donut, DONUT_COLORS, Text } from '@/components/ui';
import { MUSCLE_DIST, WORKOUTS } from '@/lib/mock';

/** Donut breakdown of training by muscle group, with a colour-keyed legend. */
export function MuscleGroupChart() {
  return (
    <Card>
      <Text variant="label" style={styles.distLabel}>
        Muscle-group distribution
      </Text>
      <View style={styles.distRow}>
        <Donut data={MUSCLE_DIST}>
          <View style={styles.donutCenter}>
            <Text variant="num" size={24} color={colors.text}>
              {WORKOUTS.length}
            </Text>
            <Text style={styles.donutLabel}>workouts</Text>
          </View>
        </Donut>
        <View style={styles.legend}>
          {MUSCLE_DIST.map((d, i) => (
            <View key={d.group} style={styles.legendRow}>
              <View style={[styles.swatch, { backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length] }]} />
              <Text variant="small" color={colors.text2} style={styles.legendName}>
                {d.group}
              </Text>
              <Text variant="num" size={14} color={colors.text}>
                {d.pct}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  distLabel: { marginBottom: 16 },
  distRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  donutCenter: { alignItems: 'center' },
  donutLabel: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 9.5,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMut,
  },
  legend: { flex: 1, gap: 9 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  swatch: { width: 9, height: 9, borderRadius: 3 },
  legendName: { flex: 1, fontFamily: fontFamily.bodySemiBold },
});
