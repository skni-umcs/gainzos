export const AUTH_ENDPOINTS = {
  validate: '/auth/validate',
  login: '/auth/login',
  logout: '/auth/logout',
  register: '/auth/register',
  me: '/auth/me',
} as const;

export const EXERCISES_TYPE_ENDPOINTS = {
  getAll: '/exercises-type/getAll',
  getAllMobile: '/exercises-type/getAllMobile',
  byId: (id: number) => `/exercises-type/byId/${id}`,
  add: '/exercises-type/add',
  update: '/exercises-type/update',
  delete: (id: number) => `/exercises-type/${id}`,
} as const;

export const EXERCISES_ENDPOINTS = {
  getAll: '/exercises/getAll',
  getAllMobile: '/exercises/getAllMobile',
  byId: (id: number) => `/exercises/byId/${id}`,
  byName: (name: string) => `/exercises/byName/${name}`,
  add: '/exercises/add',
  update: '/exercises/update',
  delete: (id: number) => `/exercises/${id}`,
} as const;

export const MEDIA_ENDPOINTS = {
  upload: '/media/upload',
  getMetadata: (id: number) => `/media/getMetadata/${id}`,
  getAll: '/media/getAll',
  delete: (id: number) => `/media/${id}`,
} as const;

export const QUOTES_ENDPOINTS = {
  getAll: '/quotes/getAll',
  getAllMobile: '/quotes/getAllMobile',
  byId: (id: number) => `/quotes/byId/${id}`,
  add: '/quotes/add',
  update: '/quotes/update',
  delete: (id: number) => `/quotes/${id}`,
} as const;

export const USER_ENDPOINTS = {
  getAll: '/user/getAll',
  getAllMobile: '/user/getAllMobile',
  byId: (id: number) => `/user/byId/${id}`,
  byEmail: (email: string) => `/user/byEmail/${email}`,
  add: '/user/add',
  update: '/user/update',
  delete: (id: number) => `/user/${id}`,
} as const;

export const USER_METRICS_ENDPOINTS = {
  getAll: '/user-metrics/getAll',
  getAllMobile: '/user-metrics/getAllMobile',
  byId: (id: number) => `/user-metrics/byId/${id}`,
  add: '/user-metrics/add',
  update: '/user-metrics/update',
  delete: (id: number) => `/user-metrics/${id}`,
} as const;

export const WORKOUT_ITEMS_ENDPOINTS = {
  getAll: '/workout-items/getAll',
  getAllMobile: '/workout-items/getAllMobile',
  byId: (id: number) => `/workout-items/byId/${id}`,
  add: '/workout-items/add',
  update: '/workout-items/update',
  delete: (id: number) => `/workout-items/${id}`,
} as const;

export const WORKOUT_TEMPLATES_ENDPOINTS = {
  getAll: '/workout-templates/getAll',
  getAllMobile: '/workout-templates/getAllMobile',
  byId: (id: number) => `/workout-templates/byId/${id}`,
  add: '/workout-templates/add',
  update: '/workout-templates/update',
  delete: (id?: number) => id !== undefined ? `/workout-templates/${id}` : '/workout-templates/deleteMultiple'
} as const;

export const WORKOUTS_ENDPOINTS = {
  getAll: '/workouts/getAll',
  getAllMobile: '/workouts/getAllMobile',
  byId: (id: number) => `/workouts/byId/${id}`,
  add: '/workouts/add',
  update: '/workouts/update',
  delete: (id: number) => `/workouts/${id}`,
} as const;

export const ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  EXERCISES_TYPE: EXERCISES_TYPE_ENDPOINTS,
  EXERCISES: EXERCISES_ENDPOINTS,
  MEDIA: MEDIA_ENDPOINTS,
  QUOTES: QUOTES_ENDPOINTS,
  USER: USER_ENDPOINTS,
  USER_METRICS: USER_METRICS_ENDPOINTS,
  WORKOUT_ITEMS: WORKOUT_ITEMS_ENDPOINTS,
  WORKOUT_TEMPLATES: WORKOUT_TEMPLATES_ENDPOINTS,
  WORKOUTS: WORKOUTS_ENDPOINTS,
} as const;