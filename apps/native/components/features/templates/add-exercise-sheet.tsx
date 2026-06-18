import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, Plus, Search, X } from 'lucide-react-native';
import type { ExerciseDTO, WorkoutItemDTO } from '@gainzos/types';
import { colors, fontFamily, radius } from '@/theme';
import { IconButton, Img, Text } from '@/components/ui';
import {
  EXERCISE_TYPES,
  EXERCISE_TYPE_COUNT,
  exerciseTypeById,
  exercisesByType,
  muscleLabel,
  nextWorkoutItemId,
  nextWorkoutSetId,
} from '@/lib/mock';
import { useTemplateStore } from '@/lib/store/template';

/** A freshly added exercise starts with three identical sets of sensible defaults. */
function buildDraftItem(exercise: ExerciseDTO): WorkoutItemDTO {
  const isStatic = exercise.force === 'Static';
  return {
    id: nextWorkoutItemId(),
    exercise,
    sets: Array.from({ length: 3 }, () => ({
      id: nextWorkoutSetId(),
      reps: isStatic ? 0 : 10,
      durationSeconds: isStatic ? 30 : 0,
      restTimeSeconds: 90,
      weight: 0,
    })),
  };
}

interface AddExerciseSheetProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * Slide-up, two-step exercise picker. Step 1: choose an exercise type.
 * Step 2: browse exercises of that type and tap to add to the draft.
 */
export function AddExerciseSheet({ visible, onClose }: AddExerciseSheetProps) {
  const insets = useSafeAreaInsets();
  const addWorkoutItem = useTemplateStore((s) => s.addWorkoutItem);
  const [typeId, setTypeId] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  const selectedType = typeId != null ? exerciseTypeById(typeId) : undefined;

  const reset = () => {
    setTypeId(null);
    setQuery('');
  };
  const close = () => {
    reset();
    onClose();
  };
  const add = (exercise: ExerciseDTO) => {
    addWorkoutItem(buildDraftItem(exercise));
    close();
  };

  const exercises =
    typeId != null
      ? exercisesByType(typeId).filter((e) =>
          e.name.toLowerCase().includes(query.trim().toLowerCase()),
        )
      : [];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={close}>
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={close} />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.handle} />

          <View style={styles.header}>
            {selectedType ? (
              <IconButton size={36} onPress={() => setTypeId(null)} style={styles.headerBtn}>
                <ChevronLeft size={20} strokeWidth={2.3} color={colors.text} />
              </IconButton>
            ) : (
              <View style={styles.headerSpacer} />
            )}
            <View style={styles.headerTitle}>
              <Text variant="eyebrow">{selectedType ? 'Step 2 of 2' : 'Step 1 of 2'}</Text>
              <Text variant="h2" color={colors.text}>
                {selectedType ? selectedType.name : 'Choose a type'}
              </Text>
            </View>
            <IconButton size={36} onPress={close} style={styles.headerBtn}>
              <X size={19} strokeWidth={2.3} color={colors.text2} />
            </IconButton>
          </View>

          {selectedType ? (
            <>
              <View style={styles.search}>
                <Search size={17} strokeWidth={2.2} color={colors.textMut} />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder={`Search ${selectedType.name.toLowerCase()} exercises`}
                  placeholderTextColor={colors.textFaint}
                  style={styles.searchInput}
                  autoCorrect={false}
                />
              </View>
              <ScrollView
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              >
                {exercises.map((exercise) => (
                  <Pressable
                    key={exercise.id}
                    onPress={() => add(exercise)}
                    style={({ pressed }) => [styles.exRow, pressed && styles.rowPressed]}
                  >
                    <Img media={exercise.image} radius={12} style={styles.exThumb} />
                    <View style={styles.exInfo}>
                      <Text variant="h3" color={colors.text} numberOfLines={1}>
                        {exercise.name}
                      </Text>
                      <Text variant="small" style={styles.exMeta} numberOfLines={1}>
                        {muscleLabel(exercise.primaryMuscle)} · {exercise.force}
                      </Text>
                    </View>
                    <View style={styles.addBadge}>
                      <Plus size={18} strokeWidth={2.6} color={colors.accentBr} />
                    </View>
                  </Pressable>
                ))}
                {exercises.length === 0 && (
                  <Text variant="small" style={styles.empty}>
                    No exercises match “{query.trim()}”.
                  </Text>
                )}
              </ScrollView>
            </>
          ) : (
            <ScrollView
              style={styles.list}
              contentContainerStyle={styles.grid}
              showsVerticalScrollIndicator={false}
            >
              {EXERCISE_TYPES.map((type) => (
                <Pressable
                  key={type.id}
                  onPress={() => setTypeId(type.id)}
                  style={({ pressed }) => [styles.typeCard, pressed && styles.rowPressed]}
                >
                  <Img media={type.media} radius={radius.md} scrim scrimStrength={0.7} style={styles.typeImg}>
                    <View style={styles.typeContent}>
                      <Text variant="h3" color={colors.white}>
                        {type.name}
                      </Text>
                      <View style={styles.typeFoot}>
                        <Text variant="small" color={colors.text2}>
                          {EXERCISE_TYPE_COUNT[type.id] ?? exercisesByType(type.id).length} exercises
                        </Text>
                        <ChevronRight size={16} strokeWidth={2.4} color={colors.text2} />
                      </View>
                    </View>
                  </Img>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.scrim },
  sheet: {
    backgroundColor: colors.surface1,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    paddingHorizontal: 20,
    paddingTop: 10,
    maxHeight: '86%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.surface4,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  headerBtn: { backgroundColor: colors.surface3 },
  headerSpacer: { width: 36 },
  headerTitle: { flex: 1 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: colors.surface3,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    color: colors.text,
    fontFamily: fontFamily.body,
    fontSize: 15,
  },
  list: { alignSelf: 'stretch' },
  listContent: { gap: 10, paddingBottom: 8 },
  rowPressed: { opacity: 0.7 },
  exRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    backgroundColor: colors.surface2,
    borderRadius: radius.lg,
    padding: 12,
  },
  exThumb: { width: 48, height: 48 },
  exInfo: { flex: 1 },
  exMeta: { marginTop: 2 },
  addBadge: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: { textAlign: 'center', paddingVertical: 24 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  typeCard: { width: '48.5%', marginBottom: 11 },
  typeImg: { width: '100%', height: 104 },
  typeContent: { flex: 1, justifyContent: 'flex-end', padding: 12, gap: 2 },
  typeFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
