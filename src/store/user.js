import { reactive } from "vue";
import { defineStore } from "pinia";

const useUserStore = defineStore("userStore", () => {
  const userInfo = reactive({
    id: "1",
    name: "zhangsan",
  });

  function upDataInfo(info) {
    userInfo.id = info?.id;
    userInfo.name = info?.name;
  }

  return { userInfo, upDataInfo };
});

export default useUserStore;
