import { apiFetch } from "./fetcher";
import { Quote, User, Exercise, ExerciseType } from "../types";

export const api = {
    quotes: {
        getAll : () => apiFetch("/quotes/getAll"),
        add: (quote: Quote) => apiFetch("/quotes/add", {
            method: "POST",
            body: quote
        }),
        update: (quote: Quote) => apiFetch("/quotes/update", {
            method: "PUT",
            body: quote
        }),
        delete: (id: number) => apiFetch(`/quotes/${id}`, {
            method: "DELETE"
        })
    },
    exercises: {
        getAll : () => apiFetch("/exercises/getAll"),
        add: (exercise: Exercise) => apiFetch("/exercises/add", {
            method: "POST",
            body: exercise
        }),
        update: (exercise: Exercise) => apiFetch("/exercises/update", {
            method: "PUT",
            body: exercise
        }),
        delete: (id: number) => apiFetch(`/exercises/${id}`, {
            method: "DELETE"
        })
    },
    exerciseTypes: {
        getAll : () => apiFetch("/exercises-types/getAll"),
        add: (exerciseType: ExerciseType) => apiFetch("/exercises-types/add", {
            method: "POST",
            body: exerciseType
        }),
        update: (exerciseType: ExerciseType) => apiFetch("/exercises-types/update", {
            method: "PUT",
            body: exerciseType
        }),
        delete: (id: number) => apiFetch(`/exercises-types/${id}`, {
            method: "DELETE"
        })
    },
    users: {
        getAll : () => apiFetch("/user/getAll"),
    },
    auth: {
        login: (email: string, password: string) => apiFetch("/auth/login", {
            method: "POST",
            body: new URLSearchParams({ username: email, password }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }),
        logout: () => apiFetch("/auth/logout", {
            method: "POST"
        }),
        register: (user: User) => apiFetch("/auth/register", {
            method: "POST",
            body: user
        }),
        me: () => apiFetch("/auth/me")
    }
}