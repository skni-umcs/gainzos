import { apiFetch } from "./fetcher";
import { User} from "../types";

export const api = {
    quotes: {
        getAll : () => apiFetch("/quotes/getAll"),
    },
    exercises: {
        getAll : () => apiFetch("/exercises/getAll"),
    },
    exerciseTypes: {
        getAll : () => apiFetch("/exercises-types/getAll"),
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