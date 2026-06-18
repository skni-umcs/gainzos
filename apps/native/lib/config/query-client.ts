import { QueryClient } from "@tanstack/react-query";
import { createMMKV } from "react-native-mmkv";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

/**
 * MMKV-backed cache persistence. MMKV is synchronous and requires the New
 * Architecture, so it runs in a development build (not Expo Go). The async
 * persister is TanStack's universal one — it accepts this synchronous storage.
 */
const storage = createMMKV({ id: "gainzos-query-cache" });

const mmkvStorage = {
  getItem: (key: string): string | null => storage.getString(key) ?? null,
  setItem: (key: string, value: string): void => storage.set(key, value),
  removeItem: (key: string): void => {
    storage.remove(key);
  },
};

export const persister = createAsyncStoragePersister({
  storage: mmkvStorage,
});
