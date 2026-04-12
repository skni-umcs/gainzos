import { useEffect, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AddExerciseCard } from '@/components/templates/creator/add-exercise-card';
import { ScreenTitle } from '@/components/ui/screen-title';
import { useTemplateStore } from '@/lib/store/template';
import { colors } from '@/theme/colors';

export function CreateTemplateScreen({ onClose }: { onClose: () => void }) {
  const draft = useTemplateStore((state) => state.draft);
  const ensureFresh = useTemplateStore((state) => state.ensureFresh);

  useEffect(() => {
    ensureFresh();
  }, [ensureFresh]);

  const groupedWorkoutItems = useMemo(() => {
    const grouped = new Map<
      string,
      { groupKey: string; exerciseName: string; items: typeof draft.workoutItems }
    >();

    draft.workoutItems.forEach((item) => {
      const exerciseKey =
        item.exercise.id != null ? `id-${item.exercise.id}` : `name-${item.exercise.name}`;

      const existingGroup = grouped.get(exerciseKey);

      if (!existingGroup) {
        grouped.set(exerciseKey, {
          groupKey: exerciseKey,
          exerciseName: item.exercise.name,
          items: [item],
        });
        return;
      }

      existingGroup.items.push(item);
    });

    return Array.from(grouped.values());
  }, [draft.workoutItems]);

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <View className='flex-1 flex-row justify-between'>
          <ScreenTitle title="Tworzenie profilu" description="Stwórz własny profil" />
          <Pressable onPress={onClose} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Wróć</Text>
          </Pressable>
        </View>

        {groupedWorkoutItems.map((group) => (
          <View key={group.groupKey} style={styles.card}>
            <Text style={styles.cardTitle}>{group.exerciseName}</Text>

            <View style={styles.itemsList}>
              {group.items.map((item, index) => (
                <View key={item.id} style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Workout item {index + 1}</Text>
                  <Text style={styles.cardText}>
                    Serie: {item.sets} • Powtórzenia: {item.reps}
                  </Text>
                  <Text style={styles.cardText}>
                    Czas: {item.durationSeconds}s • Przerwa: {item.restTimeSeconds}s • Ciężar:{' '}
                    {item.weight}kg
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <AddExerciseCard onPress={() => {}} />

        <Pressable style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Zapisz profil</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: colors.containerHigh,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  backButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  card: {
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.containerHigh,
    padding: 16,
    gap: 8,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  cardText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  itemsList: {
    marginTop: 4,
    gap: 10,
  },
  itemRow: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 10,
    padding: 10,
    gap: 2,
    backgroundColor: colors.containerLow,
  },
  itemTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  saveButton: {
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.textOnPrimary,
    fontSize: 15,
    fontWeight: '800',
  },
});
