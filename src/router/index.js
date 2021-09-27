import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/login.vue";

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
