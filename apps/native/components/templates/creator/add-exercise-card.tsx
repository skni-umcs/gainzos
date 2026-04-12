import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

interface AddExerciseCardProps {
  onPress?: () => void;
}

export function AddExerciseCard({ onPress }: AddExerciseCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.plusCircle}>
        <Text style={styles.plus}>+</Text>
      </View>
      <Text style={styles.label}>Dodaj workout item</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 120,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: `${colors.outlineVariant}CC`,
    borderRadius: 14,
    backgroundColor: `${colors.containerLow}99`,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 12,
  },
  plusCircle: {
    width: 50,
    height: 50,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: `${colors.primary}AA`,
    backgroundColor: `${colors.primaryContainer}AA`,
  },
  plus: {
    color: colors.primaryFixed,
    fontSize: 32,
    lineHeight: 34,
    fontWeight: '700',
  },
  label: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
});
