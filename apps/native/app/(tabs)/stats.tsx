import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '@/theme';
import { Chip, Pad, Screen, ScreenTitle } from '@/components/ui';
import { VolumeChart } from '@/components/tabs/stats/volume-chart';
import { AveregeStats } from '@/components/tabs/stats/averege-stats';
import { WorkoutCalendar } from '@/components/tabs/stats/workout-calendar';
import { MuscleGroupChart } from '@/components/tabs/stats/muscle-group-chart';

const RANGES = ['4W', '12W', '6M', '1Y'] as const;

export default function AnalyticsScreen() {
  const [range, setRange] = useState<(typeof RANGES)[number]>('12W');

  return (
    <Screen>
      <Pad>
        <ScreenTitle eyebrow="Your trends" title="Analytics" />

        <View style={styles.ranges}>
          {RANGES.map((r) => (
            <Chip key={r} label={r} active={range === r} onPress={() => setRange(r)} />
          ))}
        </View>

        <View style={styles.stack}>
          <VolumeChart />
          <AveregeStats />
          <WorkoutCalendar />
          <MuscleGroupChart />
        </View>
      </Pad>
    </Screen>
  );
}

const styles = StyleSheet.create({
  ranges: { flexDirection: 'row', gap: 8, marginBottom: spacing.xl },
  stack: { gap: 14 },
});
