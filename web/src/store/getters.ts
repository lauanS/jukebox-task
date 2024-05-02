import type { GetterTree } from "vuex";
import type { AuthState } from ".";

export const getters: GetterTree<AuthState, AuthState> = {
  user: (state) => state.user,
  isAuthenticated: (state) => {
    console.log("isAuthenticated:", !!(state.user && state.user.email));
    return !!(state.user && state.user.email);
  },
};
