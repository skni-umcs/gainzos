import { View, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import type { WorkoutItemDTO } from '@gainzos/types';
import { colors, fontFamily, radius } from '@/theme';
import { Card, IconButton, Img, Text } from '@/components/ui';
import { muscleLabel } from '@/lib/mock';
import { useTemplateStore } from '@/lib/store/template';
import { Stepper } from './stepper';

/** A control row: left label, right stepper. */
function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.control}>
      <Text variant="small" color={colors.text2} style={styles.controlLabel}>
        {label}
      </Text>
      {children}
    </View>
  );
}

/**
 * An exercise added to the draft, with inline controls for sets, reps/time,
 * weight and rest. Mirrors the detail view's reps-vs-duration heuristic
 * (`reps || durationSeconds`) so display and editor stay in agreement.
 */
export function ExerciseItemCard({ item, index }: { item: WorkoutItemDTO; index: number }) {
  const update = useTemplateStore((s) => s.updateWorkoutItem);
  const remove = useTemplateStore((s) => s.removeWorkoutItem);
  const isTimed = !item.reps;

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
        <IconButton size={34} onPress={() => remove(item.id)} style={styles.removeBtn}>
          <X size={17} strokeWidth={2.3} color={colors.text2} />
        </IconButton>
      </View>

      <View style={styles.controls}>
        <Control label="Sets">
          <Stepper value={item.sets} min={1} max={20} onChange={(v) => update(item.id, { sets: v })} />
        </Control>
        {isTimed ? (
          <Control label="Time">
            <Stepper
              value={item.durationSeconds}
              min={5}
              max={600}
              step={5}
              format={(v) => `${v}s`}
              onChange={(v) => update(item.id, { durationSeconds: v })}
            />
          </Control>
        ) : (
          <>
            <Control label="Reps">
              <Stepper value={item.reps} min={1} max={50} onChange={(v) => update(item.id, { reps: v })} />
            </Control>
            <Control label="Weight">
              <Stepper
                value={item.weight}
                min={0}
                max={500}
                step={2.5}
                format={(v) => `${v}kg`}
                onChange={(v) => update(item.id, { weight: v })}
              />
            </Control>
          </>
        )}
        <Control label="Rest">
          <Stepper
            value={item.restTimeSeconds}
            min={0}
            max={600}
            step={15}
            format={(v) => `${v}s`}
            onChange={(v) => update(item.id, { restTimeSeconds: v })}
          />
        </Control>
      </View>
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
  controls: {
    backgroundColor: colors.surface1,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
  },
  controlLabel: { fontFamily: fontFamily.bodySemiBold },
});
