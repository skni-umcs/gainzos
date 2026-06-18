import { View, Pressable, StyleSheet } from 'react-native';
import { Plus, Play, Square } from 'lucide-react-native';
import { colors, fontFamily } from '@/theme';
import { Button, Card, Img, Text } from '@/components/ui';
import { muscleLabel } from '@/lib/mock';
import { useNow } from '@/lib/hooks/use-workout-timer';
import { useWorkoutStore, type SessionItem } from '@/lib/store/workout';
import { SetRow } from './set-row';

const remainingSeconds = (endsAt: number, now: number) =>
  Math.max(0, Math.ceil((endsAt - now) / 1000));

/**
 * One exercise in a live session: its sets plus an auto-advance control.
 * "Auto" runs the exercise hands-free — each set's work countdown flows into its
 * rest and on to the next set automatically. Timed sets use their own duration;
 * rep-based sets use an estimate (see `autoWorkSeconds`). The user can still tap
 * a set done early or skip a phase from the rest bar.
 */
export function ExerciseCard({ item, index }: { item: SessionItem; index: number }) {
  const timer = useWorkoutStore((s) => s.session?.timer ?? null);
  const autoItemId = useWorkoutStore((s) => s.session?.autoItemId ?? null);
  const startExercise = useWorkoutStore((s) => s.startExercise);
  const stopAuto = useWorkoutStore((s) => s.stopAuto);
  const addSet = useWorkoutStore((s) => s.addSet);

  const isAuto = autoItemId === item.id;
  const allDone = item.sets.every((set) => set.done);

  // Only the card with a running work countdown needs a per-second clock.
  const workTimer = timer && timer.itemId === item.id && timer.phase === 'work' ? timer : null;
  const now = useNow(!!workTimer);

  return (
    <Card tier="2" style={styles.card}>
      <View style={styles.head}>
        <Text variant="num" size={15} color={colors.textMut} style={styles.index}>
          {index + 1}
        </Text>
        <Img media={item.exercise.image} radius={12} style={styles.thumb} />
        <View style={styles.info}>
          <Text variant="h3" color={colors.text} numberOfLines={1}>
            {item.exercise.name}
          </Text>
          <Text variant="small" style={styles.meta} numberOfLines={1}>
            {muscleLabel(item.exercise.primaryMuscle)} · {item.exercise.force}
          </Text>
        </View>
        <Pressable
          onPress={() => (isAuto ? stopAuto() : startExercise(item.id))}
          disabled={allDone && !isAuto}
          style={[styles.autoBtn, isAuto ? styles.autoOn : styles.autoOff, allDone && !isAuto && styles.autoDisabled]}
        >
          {isAuto ? (
            <Square size={13} strokeWidth={2.6} color={colors.onAccent} fill={colors.onAccent} />
          ) : (
            <Play size={13} strokeWidth={2.6} color={colors.accentBr} fill={colors.accentBr} />
          )}
          <Text style={[styles.autoLabel, { color: isAuto ? colors.onAccent : colors.accentBr }]}>
            {isAuto ? 'Auto' : 'Start'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.table}>
        <View style={styles.labelRow}>
          <Text style={[styles.colLabel, styles.setNo]}>#</Text>
          <Text style={[styles.colLabel, styles.cell]}>Kg</Text>
          <Text style={[styles.colLabel, styles.cell]}>{item.sets[0]?.targetDurationSeconds ? 'Time' : 'Reps'}</Text>
          <View style={styles.checkCol} />
        </View>

        {item.sets.map((set, setIndex) => {
          const isTarget = timer && timer.itemId === item.id && timer.setId === set.id;
          const phase = isTarget ? timer.phase : null;
          const remaining = workTimer && workTimer.setId === set.id ? remainingSeconds(workTimer.endsAt, now) : null;
          return (
            <SetRow
              key={set.id}
              itemId={item.id}
              set={set}
              index={setIndex}
              phase={phase}
              remaining={remaining}
            />
          );
        })}
      </View>

      <Button
        variant="secondary"
        onPress={() => addSet(item.id)}
        style={styles.addSetBtn}
        icon={<Plus size={16} strokeWidth={2.6} color={colors.accentBr} />}
        textStyle={styles.addSetLabel}
      >
        Add set
      </Button>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 14, gap: 14 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  index: { width: 16, textAlign: 'center' },
  thumb: { width: 46, height: 46 },
  info: { flex: 1 },
  meta: { marginTop: 2 },
  autoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
  },
  autoOff: { backgroundColor: colors.accentSoft },
  autoOn: { backgroundColor: colors.accentBr },
  autoDisabled: { opacity: 0.4 },
  autoLabel: { fontFamily: fontFamily.bodyBold, fontSize: 13 },
  table: { gap: 4 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 6 },
  colLabel: { fontFamily: fontFamily.bodySemiBold, fontSize: 11, color: colors.textMut, textAlign: 'center' },
  setNo: { width: 18, textAlign: 'center' },
  cell: { flex: 1 },
  checkCol: { width: 34 },
  addSetBtn: { alignSelf: 'flex-start' },
  addSetLabel: { color: colors.accentBr },
});
