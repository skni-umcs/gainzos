import { ExerciseType } from '@/lib/types/exercise-type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../react-query/api';

export function useExerciseTypes() {
  return useQuery({
    queryKey: ['exercise-types'],
    queryFn: api.exerciseTypes.getAll,
  });
}

export function usePostExerciseType() {
  return useMutation({
    mutationKey: ['post-exercise-type'],
    mutationFn: (newExerciseType: ExerciseType) => api.exerciseTypes.add(newExerciseType),
  });
}

export function useUpdateExerciseType() {
  return useMutation({
    mutationKey: ['update-exercise-type'],
    mutationFn: (updatedExerciseType: ExerciseType) => api.exerciseTypes.update(updatedExerciseType),
  });
}

export function useDeleteExerciseType() {
  return useMutation({
    mutationKey: ['delete-exercise-type'],
    mutationFn: (exerciseTypeId: number) => api.exerciseTypes.delete(exerciseTypeId),
  });
}
