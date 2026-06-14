import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ArrowUp } from 'lucide-react-native';
import { colors, fontFamily, spacing } from '@/theme';
import {
  Card,
  Chip,
  Donut,
  DONUT_COLORS,
  LineChart,
  MiniBars,
  Pad,
  Screen,
  ScreenTitle,
  Text,
} from '@/components/ui';
import { VOLUME_TREND, DURATION_TREND, CAL_TREND, FREQ, MUSCLE_DIST, WORKOUTS } from '@/lib/mock';

const RANGES = ['4W', '12W', '6M', '1Y'] as const;

export default function AnalyticsScreen() {
  const [range, setRange] = useState<(typeof RANGES)[number]>('12W');
  const totalVolume = VOLUME_TREND.reduce((a, b) => a + b, 0);
  const weekLabels = VOLUME_TREND.map((_, i) => (i % 2 === 0 ? `W${i + 1}` : ''));

  return (
    <Screen>
      <Pad>
        <ScreenTitle eyebrow="Your trends" title="Analytics" />

        <View style={styles.ranges}>
          {RANGES.map((r) => (
            <Chip key={r} label={r} active={range === r} onPress={() => setRange(r)} />
          ))}
        </View>

        {/* Volume hero */}
        <Card style={styles.block}>
          <View style={styles.volumeHead}>
            <View>
              <Text variant="label" style={styles.fieldLabel}>
                Total volume
              </Text>
              <View style={styles.valueRow}>
                <Text variant="num" size={42} color={colors.text}>
                  {totalVolume}
                </Text>
                <Text style={styles.unit}>tonnes</Text>
              </View>
            </View>
            <View style={styles.delta}>
              <ArrowUp size={15} strokeWidth={2.6} color={colors.success} />
              <Text style={styles.deltaText}>18%</Text>
            </View>
          </View>
          <LineChart data={VOLUME_TREND} height={120} />
        </Card>

        {/* Duration + calories */}
        <View style={styles.duo}>
          <Card style={styles.duoCard}>
            <Text variant="label" style={styles.fieldLabel}>
              Avg duration
            </Text>
            <View style={styles.valueRow}>
              <Text variant="num" size={26} color={colors.text}>
                54
              </Text>
              <Text style={styles.smallUnit}>min</Text>
            </View>
            <View style={styles.miniBars}>
              <MiniBars data={DURATION_TREND.slice(-7)} height={56} highlightLast />
            </View>
          </Card>
          <Card style={styles.duoCard}>
            <Text variant="label" style={styles.fieldLabel}>
              Avg calories
            </Text>
            <View style={styles.valueRow}>
              <Text variant="num" size={26} color={colors.text}>
                2.4k
              </Text>
              <Text style={styles.smallUnit}>kcal</Text>
            </View>
            <View style={styles.miniBars}>
              <MiniBars data={CAL_TREND.slice(-7)} height={56} highlightLast />
            </View>
          </Card>
        </View>

        {/* Training frequency */}
        <Card style={styles.block}>
          <View style={styles.freqHead}>
            <Text variant="label" style={styles.fieldLabel}>
              Training frequency
            </Text>
            <Text variant="small" color={colors.text2} style={styles.freqAvg}>
              4.3 / week avg
            </Text>
          </View>
          <MiniBars data={FREQ} labels={weekLabels} height={84} highlightLast />
        </Card>

        {/* Muscle-group distribution */}
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
      </Pad>
    </Screen>
  );
}

const styles = StyleSheet.create({
  ranges: { flexDirection: 'row', gap: 8, marginBottom: spacing.xl },
  block: { marginBottom: 14 },
  fieldLabel: { marginBottom: 6 },
  valueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  unit: { fontFamily: fontFamily.bodyBold, fontSize: 16, color: colors.textMut, marginBottom: 4 },
  smallUnit: { fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: colors.textMut, marginBottom: 3 },
  volumeHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  delta: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 26 },
  deltaText: { fontFamily: fontFamily.bodyBold, fontSize: 13, color: colors.success },
  duo: { flexDirection: 'row', gap: 14, marginBottom: 14 },
  duoCard: { flex: 1, padding: 16 },
  miniBars: { marginTop: 14 },
  freqHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  freqAvg: { fontFamily: fontFamily.bodyBold },
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
