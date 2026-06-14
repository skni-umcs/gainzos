import { View, StyleSheet } from 'react-native';
import { colors, fontFamily } from '@/theme';
import { Card, Ring, Text } from '@/components/ui';
import { TODAY } from '@/lib/mock';

/** Today's calorie and workout progress, shown as two animated rings. */
export function ProgressRings() {
  const { calories, calorieGoal, workoutsDone, workoutsPlanned } = TODAY;

  return (
    <Card style={styles.card}>
      <View style={styles.col}>
        <Ring value={calories} max={calorieGoal} size={112} stroke={10}>
          <Text variant="num" size={30} color={colors.text}>
            {calories}
          </Text>
          <Text style={[styles.ringSub, styles.ringSubNudge]}>/ {calorieGoal} kcal</Text>
        </Ring>
        <Text variant="small" color={colors.text2} style={styles.caption}>
          Calories
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.col}>
        <Ring value={workoutsDone} max={workoutsPlanned} size={112} stroke={10}>
          <Text variant="num" size={32} color={colors.text}>
            {workoutsDone}
            <Text variant="num" size={22} color={colors.textMut}>
              /{workoutsPlanned}
            </Text>
          </Text>
          <Text style={styles.ringSub}>done</Text>
        </Ring>
        <Text variant="small" color={colors.text2} style={styles.caption}>
          Workouts
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', gap: 8 },
  col: { alignItems: 'center' },
  divider: { width: 1, height: 96, backgroundColor: colors.line },
  ringSub: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMut,
  },
  // Counteracts the trailing letterSpacing so the line sits centred under the count.
  ringSubNudge: { transform: [{ translateX: 12 }] },
  caption: { marginTop: 8, fontFamily: fontFamily.bodyBold },
});
