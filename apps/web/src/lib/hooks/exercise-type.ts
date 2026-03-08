import { ExerciseType } from '@/lib/types/exercise-type';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addExerciseType,
  updateExerciseType,
  deleteExerciseType,
  fetchExercisesTypes,
} from '@/lib/api/exercise-types';

export function useExerciseTypes() {
  return useQuery({
    queryKey: ['exercise-types'],
    queryFn: fetchExercisesTypes,
    staleTime: 60 * 1000, // 1 minute
  });
}

export function usePostExerciseType() {
  return useMutation({
    mutationKey: ['post-exercise-type'],
    mutationFn: (newExerciseType: ExerciseType) => addExerciseType(newExerciseType),
  });
}

export function useUpdateExerciseType() {
  return useMutation({
    mutationKey: ['update-exercise-type'],
    mutationFn: (updatedExerciseType: ExerciseType) => updateExerciseType(updatedExerciseType),
  });
}

export function useDeleteExerciseType() {
  return useMutation({
    mutationKey: ['delete-exercise-type'],
    mutationFn: (exerciseTypeId: string) => deleteExerciseType(exerciseTypeId),
  });
}
