import { Exercise } from '@/lib/types/exercise';
import { api } from '../react-query/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useExercises() {
  return useQuery({
    queryKey: ['exercises'],
    queryFn: api.exercises.getAll,
  });
}

export function usePostExercise() {
  return useMutation({
    mutationKey: ['post-exercise'],
    mutationFn: (newExercise: Exercise) => api.exercises.add(newExercise),
  });
}

export function useUpdateExercise() {
  return useMutation({
    mutationKey: ['update-exercise'],
    mutationFn: (updatedExercise: Exercise) => api.exercises.update(updatedExercise),
  });
}

export function useDeleteExercise() {
  return useMutation({
    mutationKey: ['delete-exercise'],
    mutationFn: (exerciseId: number) => api.exercises.delete(exerciseId),
  });
}
