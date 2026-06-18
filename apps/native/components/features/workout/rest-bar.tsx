import { View, Pressable, StyleSheet } from 'react-native';
import { ChevronsRight, Minus, Plus } from 'lucide-react-native';
import { colors, radius, spacing } from '@/theme';
import { Text } from '@/components/ui';
import { fmtDuration } from '@/lib/utils/format';
import { useNow } from '@/lib/hooks/use-workout-timer';
import { useWorkoutStore } from '@/lib/store/workout';

const ADJUST_STEP = 15;

/**
 * Sticky countdown bar for the running phase — rest between sets, or the work
 * timer of an auto-advancing timed set. Renders nothing when idle. Lets the
 * user skip to the next phase or nudge the clock by ±15s.
 */
export function RestBar() {
  const timer = useWorkoutStore((s) => s.session?.timer ?? null);
  const items = useWorkoutStore((s) => s.session?.items);
  const skipPhase = useWorkoutStore((s) => s.skipPhase);
  const adjustTimer = useWorkoutStore((s) => s.adjustTimer);

  const now = useNow(!!timer);

  if (!timer || !items) return null;

  const item = items.find((i) => i.id === timer.itemId);
  const set = item?.sets.find((x) => x.id === timer.setId);
  if (!item || !set) return null;

  const remaining = Math.max(0, Math.ceil((timer.endsAt - now) / 1000));
  const total = timer.phase === 'rest' ? set.restTimeSeconds : set.targetDurationSeconds;
  const fraction = total > 0 ? Math.min(1, Math.max(0, remaining / total)) : 0;
  const isRest = timer.phase === 'rest';

  return (
    <View style={styles.wrap}>
      <View style={styles.bar}>
        <View style={[styles.progress, { width: `${fraction * 100}%` }, isRest ? styles.progressRest : styles.progressWork]} />

        <View style={styles.content}>
          <View style={styles.left}>
            <Text variant="label" style={[styles.kicker, { color: isRest ? colors.success : colors.accentBr }]}>
              {isRest ? 'Rest' : 'Work'}
            </Text>
            <Text variant="body" color={colors.text2} numberOfLines={1} style={styles.context}>
              {item.exercise.name}
            </Text>
          </View>

          <Text variant="num" size={34} color={colors.text} style={styles.clock}>
            {fmtDuration(remaining)}
          </Text>

          <View style={styles.controls}>
            <Pressable hitSlop={6} onPress={() => adjustTimer(-ADJUST_STEP)} style={styles.ctrl}>
              <Minus size={16} strokeWidth={2.6} color={colors.text} />
            </Pressable>
            <Pressable hitSlop={6} onPress={() => adjustTimer(ADJUST_STEP)} style={styles.ctrl}>
              <Plus size={16} strokeWidth={2.6} color={colors.text} />
            </Pressable>
            <Pressable hitSlop={6} onPress={skipPhase} style={[styles.ctrl, styles.skip]}>
              <ChevronsRight size={18} strokeWidth={2.6} color={colors.onAccent} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: spacing.lg },
  bar: {
    backgroundColor: colors.surface2,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  progress: { position: 'absolute', left: 0, top: 0, bottom: 0 },
  progressRest: { backgroundColor: colors.successSoft },
  progressWork: { backgroundColor: colors.accentSoft },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  left: { flex: 1 },
  kicker: { marginBottom: 1 },
  context: {},
  clock: {},
  controls: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ctrl: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface3,
  },
  skip: { backgroundColor: colors.accentBr },
});
