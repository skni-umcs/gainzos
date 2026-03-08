import { Exercise } from '@/lib/types/exercise';
import {
  fetchExercises,
  addExercise,
  updateExercise,
  deleteExercise,
} from '@/lib/api/exercise';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useExercises() {
  return useQuery({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
    staleTime: 60 * 1000, // 1 minute
  });
}

export function usePostExercise() {
  return useMutation({
    mutationKey: ['post-exercise'],
    mutationFn: (newExercise: Exercise) => addExercise(newExercise),
  });
}

export function useUpdateExercise() {
  return useMutation({
    mutationKey: ['update-exercise'],
    mutationFn: (updatedExercise: Exercise) => updateExercise(updatedExercise),
  });
}

export function useDeleteExercise() {
  return useMutation({
    mutationKey: ['delete-exercise'],
    mutationFn: (exerciseId: number) => deleteExercise(exerciseId),
  });
}
