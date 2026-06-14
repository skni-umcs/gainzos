import { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Search, Play } from 'lucide-react-native';
import type { ExerciseDTO } from '@gainzos/types';
import { colors, spacing } from '@/theme';
import {
  Chip,
  EmptyState,
  ForceBadge,
  Img,
  Pad,
  Screen,
  SkeletonRow,
  Text,
} from '@/components/ui';
import { BackHeader } from '@/components/layout/back-header';
import { exerciseTypeById, exercisesByType, muscleLabel, HAS_VIDEO, FORCES } from '@/lib/mock';

const FILTERS = ['All', ...FORCES] as const;

export default function ExerciseListScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const typeId = Number(type);
  const exerciseType = exerciseTypeById(typeId);

  const [loading, setLoading] = useState(true);
  const [force, setForce] = useState<(typeof FILTERS)[number]>('All');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const all = exercisesByType(typeId);
  const list = force === 'All' ? all : all.filter((e) => e.force === force);

  return (
    <View style={styles.root}>
      <BackHeader title={exerciseType?.name ?? 'Exercises'} />
      <Screen>
        <Pad>
          <View style={styles.filters}>
            {FILTERS.map((f) => (
              <Chip key={f} label={f} active={force === f} onPress={() => setForce(f)} />
            ))}
          </View>

          {loading ? (
            <View>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </View>
          ) : list.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No matches"
              body="No exercises match this filter. Try a different force type."
            />
          ) : (
            <View>
              {list.map((exercise, i) => (
                <View key={exercise.id} style={i > 0 && styles.divider}>
                  <ExerciseRow exercise={exercise} />
                </View>
              ))}
            </View>
          )}
        </Pad>
      </Screen>
    </View>
  );
}

function ExerciseRow({ exercise }: { exercise: ExerciseDTO }) {
  const router = useRouter();
  return (
    <Pressable style={styles.row} onPress={() => router.push(`/exercise/${exercise.id}`)}>
      <Img media={exercise.image} radius={14} style={styles.thumb}>
        {HAS_VIDEO[exercise.id] && (
          <View style={styles.playBadge}>
            <Play size={11} color={colors.white} fill={colors.white} />
          </View>
        )}
      </Img>
      <View style={styles.info}>
        <Text variant="h3" color={colors.text}>
          {exercise.name}
        </Text>
        <Text variant="small" style={styles.muscles}>
          <Text variant="small" color={colors.text2}>
            {muscleLabel(exercise.primaryMuscle)}
          </Text>
          {'  ·  '}
          {muscleLabel(exercise.secondaryMuscle)}
        </Text>
      </View>
      <ForceBadge force={exercise.force} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  filters: { flexDirection: 'row', gap: 8, marginBottom: spacing.sm },
  divider: { borderTopWidth: 1, borderTopColor: colors.line },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 10 },
  thumb: { width: 60, height: 60 },
  playBadge: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: 'rgba(20,20,23,0.78)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  muscles: { marginTop: 3 },
});
