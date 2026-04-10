import { StyleSheet, View } from 'react-native';
import { TemplateCard } from './template-card';
import { AddTemplateCard } from './add-template';
import { WorkoutItem } from '@/lib/types/workout-item';

type Template = {
  id: number;
  title: string;
  workoutItems: WorkoutItem[];
};

function buildExercise(id: number, name: string) {
  return {
    id,
    name,
    description: `${name} exercise`,
    force: 'push',
    primaryMuscle: 'chest',
    secondaryMuscle: null,
    exercisesType: {
      id: 1,
      name: 'Strength',
    },
    image: {
      id: 1,
    },
    video: {
      id: 1,
    },
  };
}

const templates: Template[] = [
  {
    id: 1,
    title: 'Push Day',
    workoutItems: [
      { id: 1, exercise: buildExercise(1, 'Bench Press'), sets: 4, reps: 8 },
      { id: 2, exercise: buildExercise(2, 'Overhead Press'), sets: 4, reps: 10 },
      { id: 3, exercise: buildExercise(3, 'Incline Dumbbell Press'), sets: 3, reps: 12 },
      { id: 4, exercise: buildExercise(4, 'Triceps Pushdown'), sets: 3, reps: 15 },
    ],
  },
  {
    id: 2,
    title: 'Pull Day',
    workoutItems: [
      { id: 5, exercise: buildExercise(5, 'Deadlift'), sets: 4, reps: 6 },
      { id: 6, exercise: buildExercise(6, 'Bent Over Row'), sets: 4, reps: 10 },
      { id: 7, exercise: buildExercise(7, 'Lat Pulldown'), sets: 3, reps: 12 },
      { id: 8, exercise: buildExercise(8, 'Barbell Curl'), sets: 3, reps: 14 },
    ],
  },
  {
    id: 3,
    title: 'Leg Day',
    workoutItems: [
      { id: 9, exercise: buildExercise(9, 'Back Squat'), sets: 4, reps: 8 },
      { id: 10, exercise: buildExercise(10, 'Romanian Deadlift'), sets: 4, reps: 10 },
      { id: 11, exercise: buildExercise(11, 'Walking Lunges'), sets: 3, reps: 12 },
      { id: 12, exercise: buildExercise(12, 'Standing Calf Raise'), sets: 4, reps: 15 },
    ],
  },
];

export function TemplateList() {
  return (
    <View style={styles.container}>
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          title={template.title}
          workoutItems={template.workoutItems}
          onStartWorkout={() => {}}
        />
      ))}
      <AddTemplateCard onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
