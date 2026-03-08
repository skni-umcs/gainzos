export const NAVIGATION = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  EXERCISES: '/dashboard/exercises',
  EXERCISE_TYPES: '/dashboard/exercise-types',
  QUOTES: '/dashboard/quotes',
  USERS: '/dashboard/users',
  ADD_EXERCISE: '/dashboard/exercises/add',
  ADD_EXERCISE_TYPE: '/dashboard/exercise-types/add',
  ADD_QUOTE: '/dashboard/quotes/add',
  ADD_USER: '/dashboard/users/add',
  DELETE_EXERCISE: (id: string | number) => `/dashboard/exercises/${id}/delete`,
  DELETE_EXERCISE_TYPE: (id: string | number) => `/dashboard/exercise-types/${id}/delete`,
  DELETE_QUOTE: (id: string | number) => `/dashboard/quotes/${id}/delete`,
  EDIT_EXERCISE: (id: string | number) => `/dashboard/exercises/${id}/edit`,
  EDIT_EXERCISE_TYPE: (id: string | number) => `/dashboard/exercise-types/${id}/edit`,
  EDIT_QUOTE: (id: string | number) => `/dashboard/quotes/${id}/edit`,
  VIEW_EXERCISE: (id: string | number) => `/dashboard/exercises/${id}/view`,
  VIEW_EXERCISE_TYPE: (id: string | number) => `/dashboard/exercise-types/${id}/view`,
  VIEW_QUOTE: (id: string | number) => `/dashboard/quotes/${id}/view`,
};

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 50, 100];