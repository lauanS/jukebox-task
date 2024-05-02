import type { ActionContext, ActionTree } from "vuex";
import type { AuthState, User } from ".";

export const actions: ActionTree<AuthState, AuthState> = {
  login({ commit }: ActionContext<AuthState, AuthState>, user: User) {
    commit("setUser", user);
  },
  logout({ commit }: ActionContext<AuthState, AuthState>) {
    commit("logout");
  },
};
