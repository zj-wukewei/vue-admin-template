<template>
  <div>Other</div>
  <div>{{ userInfo.id }} {{ userInfo.name }}</div>
  <n-button type="primary" @click="handleUpdataClick"> updata </n-button>

  <CrudTable></CrudTable>
</template>

<script>
import { useUserStore } from "@/store";
import { storeToRefs } from "pinia";
import CrudTable from "@/components/crud-table";
export default {
  name: "Pinia",
  components: { CrudTable },
  setup() {
    const userStore = useUserStore();
    console.log("userStore", userStore);
    const { userInfo } = storeToRefs(userStore);
    const handleUpdataClick = () => {
      userStore.upDataInfo({
        id: "3",
        name: "other",
      });
    };
    return { userInfo, handleUpdataClick };
  },
};
</script>
