<template>
  <n-config-provider :locale="locale">
    <router-view />
  </n-config-provider>
</template>

<script>
import { zhCN } from "naive-ui";

export default {
  name: "App",
  setup() {
    return { locale: zhCN };
  },
};
</script>
<style>
body {
  height: 100vh;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
