import { createApp } from "vue";
import { setupVueAppPlus } from "@/plugins";

import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

setupVueAppPlus(app);

app.use(store).use(router).mount("#app");
