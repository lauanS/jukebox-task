import { createStore } from "vuex";
import { mutations } from "@/store/mutations";
import { actions } from "@/store/actions";
import { getters } from "@/store/getters";
import localStoragePlugin from "@/store/plugins";

export const STORAGE_KEY = "vuex";

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AuthState = {
  user: User | null;
};

export default createStore({
  state: {
    user: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}"),
  },
  getters,
  mutations,
  actions,
  plugins: [localStoragePlugin],
});
