import authService from "@/services/auth";
import { ActionContext } from "vuex";

type AuthState = {
  user: string | null;
};

type LoginParams = {
  email: string;
  password: string;
};

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    // loginSuccess: (state, token) => {
    //   state.user = token;
    // },
  },
  actions: {
    login: (
      actionContext: ActionContext<AuthState, any>,
      params: LoginParams
    ) => {
      console.log("Modules/auth.ts::login");
      authService
        .login(params)
        .then(async () => {
          console.log("Login Success");
          const user = await authService.user();
          console.log("User:::", user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
};
