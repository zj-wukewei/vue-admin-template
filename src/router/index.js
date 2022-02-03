import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/login/login.vue";
import Table from "../views/table/index.vue";
import Form from "../views/form/form.vue";
import Pinia from "../views/pinia/pinia.vue";

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
  {
    path: "/Pinia",
    name: "Pinia",
    component: Pinia,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
