import { MutationTree } from "vuex";
import { AuthState, User } from "@/store";

export const mutations: MutationTree<AuthState> = {
  setUser(state, user: User) {
    state.user = user;
  },
  logout(state) {
    state.user = null;
  },
};
