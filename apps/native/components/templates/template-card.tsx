import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { Button } from '@/components/ui/button';
import { WorkoutItem } from '@/lib/types/workout-item';

interface TemplateCardProps {
  title: string;
  workoutItems: WorkoutItem[];
  onStartWorkout: () => void;
}

export function TemplateCard({ title, workoutItems, onStartWorkout }: TemplateCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{workoutItems.length} ćw.</Text>
        </View>
      </View>

      <View style={styles.exerciseList}>
        {workoutItems.map((item) => (
          <View key={item.id} style={styles.exerciseRow}>
            <Text style={styles.exerciseName}>{item.exercise.name}</Text>
            <Text style={styles.exerciseDetails}>{item.sets} × {item.reps}</Text>
          </View>
        ))}
      </View>

      <Button
        onPress={onStartWorkout}
        gradient={[colors.primary, colors.primaryDim, colors.tertiary]}
      >
        Start Workout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${colors.containerHigh}CC`,
    borderColor: `${colors.outlineVariant}A0`,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    gap: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  countBadge: {
    backgroundColor: `${colors.primary}2E`,
    borderColor: `${colors.primary}66`,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  countText: {
    color: colors.primaryFixed,
    fontSize: 12,
    fontWeight: '700',
  },
  exerciseList: {
    gap: 8,
    paddingHorizontal: 4,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  exerciseName: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
    flex: 1,
  },
  exerciseDetails: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
});
