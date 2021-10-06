import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/login.vue";
import Table from "../views/table/index.vue";
import Form from "../views/form/form.vue";

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Table",
    name: "Table",
    component: Table,
  },
  {
    path: "/Form",
    name: "Form",
    component: Form,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
