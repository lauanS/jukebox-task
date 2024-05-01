import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import TaskView from "@/views/Task/TaskPage.vue";
import LoginView from "@/views/Login/LoginPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: TaskView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
