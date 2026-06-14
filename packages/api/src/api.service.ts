import type {
  ExerciseDTO,
  ExerciseTypeDTO,
  MediaDTO,
  QuoteDTO,
  UserMetricsDTO,
  WorkoutDTO,
  WorkoutItemDTO,
  WorkoutTemplateDTO,
} from '@gainzos/types';

import { client } from './client';
import { ENDPOINTS } from './endpoints';

export const API = {
  auth: {
    validate: () => client.get<unknown>(ENDPOINTS.AUTH.validate),
    me: () => client.get<unknown>(ENDPOINTS.AUTH.me),
    login: (body: unknown) => client.post<unknown>(ENDPOINTS.AUTH.login, body),
    logout: () => client.post<unknown>(ENDPOINTS.AUTH.logout, undefined),
    register: (body: unknown) => client.post<unknown>(ENDPOINTS.AUTH.register, body),
  },

  exercisesType: {
    getAll: () => client.get<ExerciseTypeDTO[]>(ENDPOINTS.EXERCISES_TYPE.getAll),
    getAllMobile: () => client.get<ExerciseTypeDTO[]>(ENDPOINTS.EXERCISES_TYPE.getAllMobile),
    byId: (id: number) => client.get<ExerciseTypeDTO>(ENDPOINTS.EXERCISES_TYPE.byId(id)),
    add: (body: unknown) => client.post<ExerciseTypeDTO>(ENDPOINTS.EXERCISES_TYPE.add, body),
    update: (body: unknown) => client.put<ExerciseTypeDTO>(ENDPOINTS.EXERCISES_TYPE.update, body),
    delete: (id: number) => client.delete<void>(ENDPOINTS.EXERCISES_TYPE.delete(id)),
  },

  exercises: {
    getAll: (typeId?: number) =>
      client.get<ExerciseDTO[]>(
        typeId != null
          ? `${ENDPOINTS.EXERCISES.getAll}?typeId=${typeId}`
          : ENDPOINTS.EXERCISES.getAll,
      ),
    getAllMobile: () => client.get<ExerciseDTO[]>(ENDPOINTS.EXERCISES.getAllMobile),
    byId: (id: number) => client.get<ExerciseDTO>(ENDPOINTS.EXERCISES.byId(id)),
    byName: (name: string) => client.get<ExerciseDTO>(ENDPOINTS.EXERCISES.byName(name)),
    add: (body: unknown) => client.post<ExerciseDTO>(ENDPOINTS.EXERCISES.add, body),
    update: (body: unknown) => client.put<ExerciseDTO>(ENDPOINTS.EXERCISES.update, body),
    delete: (id: number) => client.delete<void>(ENDPOINTS.EXERCISES.delete(id)),
  },

  media: {
    getAll: () => client.get<MediaDTO[]>(ENDPOINTS.MEDIA.getAll),
    getMetadata: (id: number) => client.get<MediaDTO>(ENDPOINTS.MEDIA.getMetadata(id)),
    upload: (body: unknown) => client.post<MediaDTO>(ENDPOINTS.MEDIA.upload, body),
    delete: (id: number) => client.delete<void>(ENDPOINTS.MEDIA.delete(id)),
  },

  quotes: {
    getAll: () => client.get<QuoteDTO[]>(ENDPOINTS.QUOTES.getAll),
    getAllMobile: () => client.get<QuoteDTO[]>(ENDPOINTS.QUOTES.getAllMobile),
    byId: (id: number) => client.get<QuoteDTO>(ENDPOINTS.QUOTES.byId(id)),
    add: (body: unknown) => client.post<QuoteDTO>(ENDPOINTS.QUOTES.add, body),
    update: (body: unknown) => client.put<QuoteDTO>(ENDPOINTS.QUOTES.update, body),
    delete: (id: number) => client.delete<void>(ENDPOINTS.QUOTES.delete(id)),
  },

  user: {
    getAll: () => client.get<unknown[]>(ENDPOINTS.USER.getAll),
    getAllMobile: () => client.get<unknown[]>(ENDPOINTS.USER.getAllMobile),
    byId: (id: number) => client.get<unknown>(ENDPOINTS.USER.byId(id)),
    byEmail: (email: string) => client.get<unknown>(ENDPOINTS.USER.byEmail(email)),
    add: (body: unknown) => client.post<unknown>(ENDPOINTS.USER.add, body),
    update: (body: unknown) => client.put<unknown>(ENDPOINTS.USER.update, body),
    delete: (id: number) => client.delete<void>(ENDPOINTS.USER.delete(id)),
  },

  userMetrics: {
    getAll: () => client.get<UserMetricsDTO[]>(ENDPOINTS.USER_METRICS.getAll),
    getAllMobile: () => client.get<UserMetricsDTO[]>(ENDPOINTS.USER_METRICS.getAllMobile),
    byId: (id: number) => client.get<UserMetricsDTO>(ENDPOINTS.USER_METRICS.byId(id)),
    add: (body: unknown) => client.post<UserMetricsDTO>(ENDPOINTS.USER_METRICS.add, body),
    update: (body: unknown) => client.put<UserMetricsDTO>(ENDPOINTS.USER_METRICS.update, body),
    delete: (id: number) => client.delete<void>(ENDPOINTS.USER_METRICS.delete(id)),
  },

  workoutItems: {
    getAll: () => client.get<WorkoutItemDTO[]>(ENDPOINTS.WORKOUT_ITEMS.getAll),
    getAllMobile: () => client.get<WorkoutItemDTO[]>(ENDPOINTS.WORKOUT_ITEMS.getAllMobile),
    byId: (id: number) => client.get<WorkoutItemDTO>(ENDPOINTS.WORKOUT_ITEMS.byId(id)),
    add: (body: unknown) => client.post<WorkoutItemDTO>(ENDPOINTS.WORKOUT_ITEMS.add, body),
    update: (body: unknown) => client.put<WorkoutItemDTO>(ENDPOINTS.WORKOUT_ITEMS.update, body),
    delete: (id: number) => client.delete<void>(ENDPOINTS.WORKOUT_ITEMS.delete(id)),
  },

  workoutTemplates: {
    getAll: () => client.get<WorkoutTemplateDTO[]>(ENDPOINTS.WORKOUT_TEMPLATES.getAll),
    getAllMobile: () => client.get<WorkoutTemplateDTO[]>(ENDPOINTS.WORKOUT_TEMPLATES.getAllMobile),
    byId: (id: number) => client.get<WorkoutTemplateDTO>(ENDPOINTS.WORKOUT_TEMPLATES.byId(id)),
    add: (body: unknown) => client.post<WorkoutTemplateDTO>(ENDPOINTS.WORKOUT_TEMPLATES.add, body),
    update: (body: unknown) =>
      client.put<WorkoutTemplateDTO>(ENDPOINTS.WORKOUT_TEMPLATES.update, body),
    delete: (id?: number) => client.delete<void>(ENDPOINTS.WORKOUT_TEMPLATES.delete(id)),
  },

  workouts: {
    getAll: () => client.get<WorkoutDTO[]>(ENDPOINTS.WORKOUTS.getAll),
    getAllMobile: () => client.get<WorkoutDTO[]>(ENDPOINTS.WORKOUTS.getAllMobile),
    byId: (id: number) => client.get<WorkoutDTO>(ENDPOINTS.WORKOUTS.byId(id)),
    add: (body: unknown) => client.post<WorkoutDTO>(ENDPOINTS.WORKOUTS.add, body),
    update: (body: unknown) => client.put<WorkoutDTO>(ENDPOINTS.WORKOUTS.update, body),
    delete: (id: number) => client.delete<void>(ENDPOINTS.WORKOUTS.delete(id)),
  },
};
