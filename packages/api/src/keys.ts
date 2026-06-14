export const KEYS = {
  auth: {
    validate: () => ['auth', 'validate'] as const,
    me: () => ['auth', 'me'] as const,
  },

  exercisesType: {
    all: () => ['exercisesType'] as const,
    allMobile: () => ['exercisesType', 'mobile'] as const,
    byId: (id: number) => ['exercisesType', id] as const,
  },

  exercises: {
    all: (typeId?: number) =>
      typeId != null ? (['exercises', { typeId }] as const) : (['exercises'] as const),
    allMobile: () => ['exercises', 'mobile'] as const,
    byId: (id: number) => ['exercises', id] as const,
    byName: (name: string) => ['exercises', 'byName', name] as const,
  },

  media: {
    all: () => ['media'] as const,
    metadata: (id: number) => ['media', id] as const,
  },

  quotes: {
    all: () => ['quotes'] as const,
    allMobile: () => ['quotes', 'mobile'] as const,
    byId: (id: number) => ['quotes', id] as const,
  },

  user: {
    all: () => ['user'] as const,
    allMobile: () => ['user', 'mobile'] as const,
    byId: (id: number) => ['user', id] as const,
    byEmail: (email: string) => ['user', 'byEmail', email] as const,
  },

  userMetrics: {
    all: () => ['userMetrics'] as const,
    allMobile: () => ['userMetrics', 'mobile'] as const,
    byId: (id: number) => ['userMetrics', id] as const,
  },

  workoutItems: {
    all: () => ['workoutItems'] as const,
    allMobile: () => ['workoutItems', 'mobile'] as const,
    byId: (id: number) => ['workoutItems', id] as const,
  },

  workoutTemplates: {
    all: () => ['workoutTemplates'] as const,
    allMobile: () => ['workoutTemplates', 'mobile'] as const,
    byId: (id: number) => ['workoutTemplates', id] as const,
  },

  workouts: {
    all: () => ['workouts'] as const,
    allMobile: () => ['workouts', 'mobile'] as const,
    byId: (id: number) => ['workouts', id] as const,
  },
} as const;
