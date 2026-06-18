import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Plus, X } from 'lucide-react-native';
import type { WorkoutItemDTO } from '@gainzos/types';
import { colors, fontFamily, radius } from '@/theme';
import { Button, Card, IconButton, Img, Text } from '@/components/ui';
import { muscleLabel, nextWorkoutSetId } from '@/lib/mock';
import { useTemplateStore } from '@/lib/store/template';

/** Compact numeric cell — a plain input that keeps its own text so partial edits don't snap to 0. */
function SetInput({
  value,
  onChange,
  decimal,
}: {
  value: number;
  onChange: (next: number) => void;
  decimal?: boolean;
}) {
  const [text, setText] = useState(String(value));

  const commit = (raw: string) => {
    const cleaned = raw.replace(decimal ? /[^0-9.]/g : /[^0-9]/g, '');
    setText(cleaned);
    onChange(cleaned === '' ? 0 : Number(cleaned) || 0);
  };

  return (
    <TextInput
      style={styles.cellInput}
      value={text}
      onChangeText={commit}
      keyboardType={decimal ? 'decimal-pad' : 'number-pad'}
      selectTextOnFocus
      maxLength={decimal ? 6 : 4}
      placeholder="0"
      placeholderTextColor={colors.textFaint}
    />
  );
}

/**
 * An exercise added to the draft. Each exercise owns a list of sets; every set
 * is one compact row carrying its own reps, exercise time, weight and rest.
 */
export function ExerciseItemCard({ item, index }: { item: WorkoutItemDTO; index: number }) {
  const removeItem = useTemplateStore((s) => s.removeWorkoutItem);
  const addSet = useTemplateStore((s) => s.addSet);
  const updateSet = useTemplateStore((s) => s.updateSet);
  const removeSet = useTemplateStore((s) => s.removeSet);

  // New set inherits the last set's values so adding sets is one tap.
  const handleAddSet = () => {
    const last = item.sets[item.sets.length - 1];
    addSet(item.id, {
      id: nextWorkoutSetId(),
      reps: last?.reps ?? 10,
      durationSeconds: last?.durationSeconds ?? 0,
      restTimeSeconds: last?.restTimeSeconds ?? 90,
      weight: last?.weight ?? 0,
    });
  };

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
        <IconButton size={34} onPress={() => removeItem(item.id)} style={styles.removeBtn}>
          <X size={17} strokeWidth={2.3} color={colors.text2} />
        </IconButton>
      </View>

      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.colLabel, styles.setNo]}>#</Text>
          <Text style={[styles.colLabel, styles.cell]}>Reps</Text>
          <Text style={[styles.colLabel, styles.cell]}>Time</Text>
          <Text style={[styles.colLabel, styles.cell]}>Kg</Text>
          <Text style={[styles.colLabel, styles.cell]}>Rest</Text>
          <View style={styles.delCol} />
        </View>

        {item.sets.map((set, setIndex) => (
          <View key={set.id} style={styles.row}>
            <Text variant="num" size={14} color={colors.textMut} style={styles.setNo}>
              {setIndex + 1}
            </Text>
            <View style={styles.cell}>
              <SetInput value={set.reps} onChange={(v) => updateSet(item.id, set.id, { reps: v })} />
            </View>
            <View style={styles.cell}>
              <SetInput
                value={set.durationSeconds}
                onChange={(v) => updateSet(item.id, set.id, { durationSeconds: v })}
              />
            </View>
            <View style={styles.cell}>
              <SetInput
                value={set.weight}
                decimal
                onChange={(v) => updateSet(item.id, set.id, { weight: v })}
              />
            </View>
            <View style={styles.cell}>
              <SetInput
                value={set.restTimeSeconds}
                onChange={(v) => updateSet(item.id, set.id, { restTimeSeconds: v })}
              />
            </View>
            {item.sets.length > 1 ? (
              <IconButton size={28} onPress={() => removeSet(item.id, set.id)} style={styles.delBtn}>
                <X size={14} strokeWidth={2.3} color={colors.text2} />
              </IconButton>
            ) : (
              <View style={styles.delCol} />
            )}
          </View>
        ))}
      </View>

      <Button
        variant="secondary"
        onPress={handleAddSet}
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
  removeBtn: { backgroundColor: colors.surface3 },
  table: { gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  colLabel: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 11,
    color: colors.textMut,
    textAlign: 'center',
  },
  setNo: { width: 16, textAlign: 'center' },
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
  delCol: { width: 28 },
  delBtn: { backgroundColor: colors.surface3 },
  addSetBtn: { alignSelf: 'flex-start' },
  addSetLabel: { color: colors.accentBr },
});
