import { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Check } from 'lucide-react-native';
import { colors, fontFamily, radius } from '@/theme';
import { Text } from '@/components/ui';
import { fmtDuration } from '@/lib/utils/format';
import { useWorkoutStore, type SessionSet } from '@/lib/store/workout';

/** Controlled numeric cell that keeps its own text so partial edits don't snap to 0. */
function NumCell({
  value,
  placeholder,
  decimal,
  editable = true,
  onChange,
}: {
  value: number;
  placeholder?: string;
  decimal?: boolean;
  editable?: boolean;
  onChange: (next: number) => void;
}) {
  const [text, setText] = useState(value ? String(value) : '');

  const commit = (raw: string) => {
    const cleaned = raw.replace(decimal ? /[^0-9.]/g : /[^0-9]/g, '');
    setText(cleaned);
    onChange(cleaned === '' ? 0 : Number(cleaned) || 0);
  };

  return (
    <TextInput
      style={[styles.cellInput, !editable && styles.cellReadonly]}
      value={text}
      onChangeText={commit}
      editable={editable}
      keyboardType={decimal ? 'decimal-pad' : 'number-pad'}
      selectTextOnFocus
      maxLength={decimal ? 6 : 4}
      placeholder={placeholder ?? '0'}
      placeholderTextColor={colors.textFaint}
    />
  );
}

interface SetRowProps {
  itemId: number;
  set: SessionSet;
  index: number;
  /** Set the current timer points at (this set), or null. */
  phase: 'work' | 'rest' | null;
  /** Seconds left on this set's timer when `phase` is set. */
  remaining: number | null;
}

/** One set in a live session: logged weight + reps/time, and a done toggle. */
export function SetRow({ itemId, set, index, phase, remaining }: SetRowProps) {
  const updateSetLog = useWorkoutStore((s) => s.updateSetLog);
  const completeSet = useWorkoutStore((s) => s.completeSet);
  const uncompleteSet = useWorkoutStore((s) => s.uncompleteSet);

  const timed = set.targetDurationSeconds > 0;
  const isWork = phase === 'work';

  const toggleDone = () => {
    if (set.done) {
      uncompleteSet(itemId, set.id);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    completeSet(itemId, set.id);
  };

  return (
    <View style={[styles.row, set.done && styles.rowDone, isWork && styles.rowActive]}>
      <Text variant="num" size={14} color={colors.textMut} style={styles.setNo}>
        {index + 1}
      </Text>

      <View style={styles.cell}>
        <NumCell
          value={set.weight}
          decimal
          placeholder={String(set.weight || 0)}
          onChange={(v) => updateSetLog(itemId, set.id, { weight: v })}
        />
      </View>

      <View style={styles.cell}>
        {isWork ? (
          // Auto-advance work countdown (shown for timed and rep-based sets alike).
          <View style={[styles.timeChip, styles.timeChipActive]}>
            <Text variant="num" size={15} color={colors.accentBr}>
              {remaining != null ? fmtDuration(remaining) : `${set.targetDurationSeconds}s`}
            </Text>
          </View>
        ) : timed ? (
          <View style={styles.timeChip}>
            <Text variant="num" size={15} color={colors.text}>
              {set.targetDurationSeconds}s
            </Text>
          </View>
        ) : (
          <NumCell
            value={set.reps}
            placeholder={String(set.targetReps || 0)}
            onChange={(v) => updateSetLog(itemId, set.id, { reps: v })}
          />
        )}
      </View>

      <Pressable
        onPress={toggleDone}
        hitSlop={8}
        style={[styles.check, set.done ? styles.checkDone : styles.checkPending]}
      >
        {set.done ? (
          <Check size={17} strokeWidth={3} color={colors.onAccent} />
        ) : (
          <View style={styles.checkEmpty} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: radius.sm,
  },
  rowDone: { opacity: 0.55 },
  rowActive: { backgroundColor: colors.accentSoft },
  setNo: { width: 18, textAlign: 'center' },
  cell: { flex: 1 },
  cellInput: {
    backgroundColor: colors.surface1,
    borderRadius: radius.sm,
    paddingVertical: 9,
    paddingHorizontal: 6,
    color: colors.text,
    fontFamily: fontFamily.body,
    fontVariant: ['tabular-nums'],
    fontSize: 15,
    textAlign: 'center',
  },
  cellReadonly: { backgroundColor: 'transparent' },
  timeChip: {
    backgroundColor: colors.surface1,
    borderRadius: radius.sm,
    paddingVertical: 9,
    alignItems: 'center',
  },
  timeChipActive: { backgroundColor: colors.accentSoft },
  check: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkPending: { backgroundColor: colors.surface3 },
  checkDone: { backgroundColor: colors.success },
  checkEmpty: {
    width: 16,
    height: 16,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.textMut,
  },
});
