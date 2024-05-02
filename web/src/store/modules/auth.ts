import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

type AuthState = {
  user: User | null;
};

const state: AuthState = {
  user: null,
};

const getters: GetterTree<AuthState, never> = {
  user: (state) => state.user,
};

const mutations: MutationTree<AuthState> = {
  setUser(state, user: User) {
    state.user = user;
  },
  logout(state) {
    state.user = null;
  },
};

const actions: ActionTree<AuthState, never> = {
  login({ commit }: ActionContext<AuthState, never>, user: User) {
    commit("setUser", user);
  },
  logout({ commit }: ActionContext<AuthState, never>) {
    commit("logout");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {},
};
