import { ENDPOINTS } from '@gainzos/api';
import { apiFetch } from './fetcher';
import type { Quote, User, Exercise, ExerciseType } from '../types';

export const api = {
  auth: {
    login: (email: string, password: string) =>
      apiFetch(ENDPOINTS.auth.login, {
        method: 'POST',
        body: new URLSearchParams({ username: email, password }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
    logout: () => apiFetch(ENDPOINTS.auth.logout, { method: 'POST' }),
    register: (user: User) => apiFetch(ENDPOINTS.auth.register, { method: 'POST', body: user }),
    me: () => apiFetch(ENDPOINTS.auth.me),
  },

  quotes: {
    getAll: () => apiFetch(ENDPOINTS.quotes.getAll),
    add: (quote: Quote) => apiFetch(ENDPOINTS.quotes.add, { method: 'POST', body: quote }),
    update: (quote: Quote) => apiFetch(ENDPOINTS.quotes.update, { method: 'PUT', body: quote }),
    delete: (id: number) => apiFetch(ENDPOINTS.quotes.delete(id), { method: 'DELETE' }),
  },

  exercises: {
    getAll: (typeId?: number) =>
      apiFetch(
        typeId != null
          ? `${ENDPOINTS.exercises.getAll}?typeId=${typeId}`
          : ENDPOINTS.exercises.getAll,
      ),
    add: (exercise: Exercise) =>
      apiFetch(ENDPOINTS.exercises.add, { method: 'POST', body: exercise }),
    update: (exercise: Exercise) =>
      apiFetch(ENDPOINTS.exercises.update, { method: 'PUT', body: exercise }),
    delete: (id: number) => apiFetch(ENDPOINTS.exercises.delete(id), { method: 'DELETE' }),
  },

  exerciseTypes: {
    getAll: () => apiFetch(ENDPOINTS.exercisesType.getAll),
    add: (exerciseType: ExerciseType) =>
      apiFetch(ENDPOINTS.exercisesType.add, { method: 'POST', body: exerciseType }),
    update: (exerciseType: ExerciseType) =>
      apiFetch(ENDPOINTS.exercisesType.update, { method: 'PUT', body: exerciseType }),
    delete: (id: number) => apiFetch(ENDPOINTS.exercisesType.delete(id), { method: 'DELETE' }),
  },

  users: {
    getAll: () => apiFetch(ENDPOINTS.user.getAll),
  },
};
