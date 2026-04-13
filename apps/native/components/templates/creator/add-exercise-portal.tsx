import { Pressable, StyleSheet, View, Text } from 'react-native';
import { Portal } from '@gorhom/portal';

import { SelectExerciseType } from '@/components/templates/creator/select-exercise-type';
import type { ExerciseType } from '@/lib/types/exercise-type';
import { colors } from '@/theme/colors';
import { useState } from 'react';

interface AddExercisePortalProps {
  isVisible: boolean;
  onClose?: () => void;
}

export function AddExercisePortal({ isVisible, onClose }: AddExercisePortalProps) {
  if (!isVisible) {
    return null;
  }

  const [currentExerciseType, setCurrentExerciseType] = useState<ExerciseType | null>(null);


  const handleClose = () => {
    setCurrentExerciseType(null);
    onClose?.();
  };

  return (
    <Portal>
      {!currentExerciseType ? (
        <View style={styles.overlay}>
          <Pressable style={styles.backdrop} onPress={handleClose} />
          <View style={styles.modalCard}>
            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>Wybierz typ ćwiczenia</Text>
              <Pressable style={styles.exitButton} onPress={handleClose}>
                <Text style={styles.exitButtonText}>Wyjdź</Text>
              </Pressable>
            </View>
            <SelectExerciseType
              onSelect={(exerciseType) => setCurrentExerciseType(exerciseType)}
            />
          </View>
        </View>
      ) : (
        <View style={styles.overlay}>
          <Pressable style={styles.backdrop} onPress={handleClose} />
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Wybrany typ ćwiczenia: {currentExerciseType.name}</Text>
            <Pressable style={styles.exitButton} onPress={handleClose}>
              <Text style={styles.exitButtonText}>Wyjdź</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Portal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000AA',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalCard: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.containerHighest,
    borderRadius: 16,
    padding: 12,
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  exitButton: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  exitButtonText: {
    color: colors.textOnPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  resultContainer: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 14,
    backgroundColor: colors.containerHigh,
    padding: 16,
    gap: 12,
  },
  resultText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
});