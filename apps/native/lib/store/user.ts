import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';

export type UserRole = 'athlete' | 'trainer' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string | null;
}

interface UserState {
  sessionToken: string | null;
  user: User | null;
  setSessionToken: (sessionToken: string | null) => void;
  setUser: (user: User | null) => void;
  setSession: (payload: { sessionToken: string; user: User }) => void;
  clearSession: () => void;
}

const secureStorage: StateStorage = {
  getItem: async (name: string) => {
    return SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      sessionToken: null,
      user: null,
      setSessionToken: (sessionToken) => set({ sessionToken }),
      setUser: (user) => set({ user }),
      setSession: ({ sessionToken, user }) => set({ sessionToken, user }),
      clearSession: () => set({ sessionToken: null, user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);