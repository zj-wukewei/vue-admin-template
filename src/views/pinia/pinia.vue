<template>
  <div>pinia</div>
  <div>{{ userInfo.id }} {{ userInfo.name }}</div>
  <n-button type="primary" @click="handleUpdataClick"> updata </n-button>

  <Other></Other>
</template>

<script>
import { useUserStore } from "@/store";
import { storeToRefs } from "pinia";
import Other from "./other";
export default {
  name: "Pinia",
  components: { Other },
  setup() {
    const userStore = useUserStore();
    console.log("userStore", userStore);
    const { userInfo } = storeToRefs(userStore);
    const handleUpdataClick = () => {
      userStore.upDataInfo({
        id: "2",
        name: "wkw",
      });
    };
    return { userInfo, handleUpdataClick };
  },
};
</script>
