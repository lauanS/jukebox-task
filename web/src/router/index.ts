import type { RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import TaskPage from "@/views/Task/TaskPage.vue";
import LoginPage from "@/views/Login/LoginPage.vue";
import RegisterPage from "@/views/Register/RegisterPage.vue";
import ForgotPasswordPage from "@/views/ForgotPassword/ForgotPasswordPage.vue";
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
    component: TaskPage,
    beforeEnter: [ensureIsAuthenticated],
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    beforeEnter: [ensureIsNotAuthenticated],
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    beforeEnter: [ensureIsNotAuthenticated],
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPasswordPage,
    beforeEnter: [ensureIsNotAuthenticated],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
