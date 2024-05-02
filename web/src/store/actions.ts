import type { ActionContext, ActionTree } from "vuex";
import type { AuthState } from ".";
import authService from "@/services/auth";

export const actions: ActionTree<AuthState, AuthState> = {
  async login({ commit }: ActionContext<AuthState, AuthState>) {
    try {
      const response = await authService.user();
      const responseUser = response.data;

      commit("setUser", responseUser);
    } catch (error) {
      console.log("Erro ao realizar login");
    }
  },
  async logout({ commit }: ActionContext<AuthState, AuthState>) {
    try {
      authService.logout();

      commit("logout");
    } catch (error) {
      console.log("Erro ao realizar logout");
    }
  },
};
