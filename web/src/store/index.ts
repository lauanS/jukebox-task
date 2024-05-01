import { createStore } from "vuex";
import auth from "./modules/auth";

export default createStore({
  state: {
    user: null,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
});
