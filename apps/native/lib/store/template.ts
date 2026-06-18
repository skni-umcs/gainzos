import { create } from 'zustand';

import type { WorkoutItemDTO as WorkoutItem, WorkoutSetDTO } from '@gainzos/types';

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
	updateWorkoutItem: (workoutItemId: number, patch: Partial<WorkoutItem>) => void;
	removeWorkoutItem: (workoutItemId: number) => void;
	addSet: (workoutItemId: number, set: WorkoutSetDTO) => void;
	updateSet: (workoutItemId: number, setId: number, patch: Partial<WorkoutSetDTO>) => void;
	removeSet: (workoutItemId: number, setId: number) => void;
	/** Seed the draft from an existing template (edit flow). */
	loadDraft: (draft: Partial<TemplateDraft>) => void;
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

	updateWorkoutItem: (workoutItemId, patch) =>
		set((state) => ({
			draft: {
				...state.draft,
				workoutItems: state.draft.workoutItems.map((item) =>
					item.id === workoutItemId ? { ...item, ...patch } : item,
				),
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

	addSet: (workoutItemId, newSet) =>
		set((state) => ({
			draft: {
				...state.draft,
				workoutItems: state.draft.workoutItems.map((item) =>
					item.id === workoutItemId ? { ...item, sets: [...item.sets, newSet] } : item,
				),
			},
			expiresAt: nextExpiry(),
		})),

	updateSet: (workoutItemId, setId, patch) =>
		set((state) => ({
			draft: {
				...state.draft,
				workoutItems: state.draft.workoutItems.map((item) =>
					item.id === workoutItemId
						? {
								...item,
								sets: item.sets.map((s) => (s.id === setId ? { ...s, ...patch } : s)),
							}
						: item,
				),
			},
			expiresAt: nextExpiry(),
		})),

	removeSet: (workoutItemId, setId) =>
		set((state) => ({
			draft: {
				...state.draft,
				workoutItems: state.draft.workoutItems.map((item) =>
					item.id === workoutItemId
						? { ...item, sets: item.sets.filter((s) => s.id !== setId) }
						: item,
				),
			},
			expiresAt: nextExpiry(),
		})),

	loadDraft: (draft) =>
		set((state) => ({
			draft: {
				...createInitialDraft(),
				...draft,
				// Clone items and their sets so editing the draft never mutates the source template.
				workoutItems: (draft.workoutItems ?? state.draft.workoutItems).map((item) => ({
					...item,
					sets: item.sets.map((s) => ({ ...s })),
				})),
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

