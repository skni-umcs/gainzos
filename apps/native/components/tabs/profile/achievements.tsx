import { View, StyleSheet } from 'react-native';
import { Trophy, Target } from 'lucide-react-native';
import { colors, fontFamily, radius } from '@/theme';
import { Badge, Bar, Card, Text } from '@/components/ui';

/**
 * Strength goals & trophies. Mock data for now — real achievements arrive later.
 * A goal is reached once `current` meets its `target`.
 */
const GOALS = [
  { lift: 'Bench press', current: 102.5, target: 100, unit: 'kg' },
  { lift: 'Squat', current: 132.5, target: 150, unit: 'kg' },
  { lift: 'Deadlift', current: 160, target: 180, unit: 'kg' },
  { lift: 'Overhead press', current: 60, target: 70, unit: 'kg' },
];

export function Achievements() {
  const earned = GOALS.filter((g) => g.current >= g.target).length;

  return (
    <Card>
      <View style={styles.head}>
        <Text variant="label" style={styles.fieldLabel}>
          Achievements
        </Text>
        <Text variant="small" color={colors.text2} style={styles.count}>
          {earned} / {GOALS.length} reached
        </Text>
      </View>

      <View style={styles.list}>
        {GOALS.map((g) => {
          const done = g.current >= g.target;
          return (
            <View key={g.lift} style={styles.row}>
              <View style={[styles.icon, done ? styles.iconDone : styles.iconTodo]}>
                {done ? (
                  <Trophy size={17} strokeWidth={2.2} color={colors.onAccent} />
                ) : (
                  <Target size={17} strokeWidth={2.2} color={colors.textMut} />
                )}
              </View>
              <View style={styles.detail}>
                <View style={styles.detailHead}>
                  <Text variant="small" color={colors.text} style={styles.lift}>
                    {g.lift}
                  </Text>

                  <Text style={styles.goal}>
                    {g.current} / {g.target} {g.unit}
                  </Text>
                </View>
                <Bar value={g.current} max={g.target} height={6} />
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  fieldLabel: { marginBottom: 0 },
  count: { fontFamily: fontFamily.bodyBold },
  list: { gap: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDone: { backgroundColor: colors.accent },
  iconTodo: { backgroundColor: colors.surface3 },
  detail: { flex: 1, gap: 7 },
  detailHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  lift: { fontFamily: fontFamily.bodyBold },
  goal: { fontFamily: fontFamily.bodySemiBold, fontSize: 12, color: colors.textMut },
});
