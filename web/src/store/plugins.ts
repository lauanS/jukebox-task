import type { Store } from "vuex";
import { AuthState, STORAGE_KEY } from "@/store";

const localStoragePlugin = (store: Store<AuthState>) => {
  store.subscribe((_mutation: never, { user }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  });
};

export default localStoragePlugin;
