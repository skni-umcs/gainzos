import { create } from 'zustand';

import { WorkoutItem } from '../types/workout-item';

const TEMPLATE_DRAFT_TTL_MS = 30 * 60 * 1000;

interface TemplateDraft {
	name: string;
	description: string;
	workoutItems: WorkoutItem[];
}

interface TemplateStore {
	draft: TemplateDraft;
	expiresAt: number;
	setName: (name: string) => void;
	setDescription: (description: string) => void;
	setWorkoutItems: (workoutItems: WorkoutItem[]) => void;
	addWorkoutItem: (workoutItem: WorkoutItem) => void;
	removeWorkoutItem: (workoutItemId: number) => void;
	clearDraft: () => void;
	renewExpiration: () => void;
	ensureFresh: () => void;
}

const createInitialDraft = (): TemplateDraft => ({
	name: '',
	description: '',
	workoutItems: [],
});

const nextExpiry = () => Date.now() + TEMPLATE_DRAFT_TTL_MS;

export const useTemplateStore = create<TemplateStore>()((set, get) => ({
	draft: createInitialDraft(),
	expiresAt: nextExpiry(),

	setName: (name) =>
		set((state) => ({
			draft: {
				...state.draft,
				name,
			},
			expiresAt: nextExpiry(),
		})),

	setDescription: (description) =>
		set((state) => ({
			draft: {
				...state.draft,
				description,
			},
			expiresAt: nextExpiry(),
		})),

	setWorkoutItems: (workoutItems) =>
		set((state) => ({
			draft: {
				...state.draft,
				workoutItems,
			},
			expiresAt: nextExpiry(),
		})),

	addWorkoutItem: (workoutItem) =>
		set((state) => ({
			draft: {
				...state.draft,
				workoutItems: [...state.draft.workoutItems, workoutItem],
			},
			expiresAt: nextExpiry(),
		})),

	removeWorkoutItem: (workoutItemId) =>
		set((state) => ({
			draft: {
				...state.draft,
				workoutItems: state.draft.workoutItems.filter((item) => item.id !== workoutItemId),
			},
			expiresAt: nextExpiry(),
		})),

	clearDraft: () =>
		set({
			draft: createInitialDraft(),
			expiresAt: nextExpiry(),
		}),

	renewExpiration: () =>
		set({
			expiresAt: nextExpiry(),
		}),

	ensureFresh: () => {
		const { expiresAt } = get();

		if (Date.now() > expiresAt) {
			set({
				draft: createInitialDraft(),
				expiresAt: nextExpiry(),
			});
		}
	},
}));

