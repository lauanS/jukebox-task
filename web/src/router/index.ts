import type { RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import TaskView from "@/views/Task/TaskPage.vue";
import LoginView from "@/views/Login/LoginPage.vue";
import store from "@/store";

function ensureIsAuthenticated(to: RouteLocationNormalized) {
  if (!store.getters.isAuthenticated && to.name !== "login") {
    return { name: "login" };
  }
}

function ensureIsNotAuthenticated(to: RouteLocationNormalized) {
  if (store.getters.isAuthenticated && to.name !== "home") {
    return { name: "home" };
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: TaskView,
    beforeEnter: [ensureIsAuthenticated],
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    beforeEnter: [ensureIsNotAuthenticated],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
