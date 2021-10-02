<template>
  <BasicTable @register="register"></BasicTable>
  <n-button type="primary" @click="onSubmit"> 立即登录 </n-button>
</template>

<script>
import { BasicTable, useTable } from "@/components";

export default {
  name: "tableList",
  components: { BasicTable },
  setup() {
    const fetcApi = (aaa) => {
      console.log("aaaaa", aaa);
      return new Promise((resolve) => {
        setTimeout(async () => {
          resolve({
            total: 31,
            data: [
              { id: "0", aa: 1111, bb: 222 },
              { id: "0", aa: 1111, bb: 222 },
              { id: "0", aa: 1111, bb: 222 },
              { id: "0", aa: 1111, bb: 222 },
            ],
          });
        }, 1000);
      });
    };
    const [register, { refresh }] = useTable({
      api: fetcApi,
      columns: [
        {
          title: "aa",
          key: "aa",
        },
        {
          title: "bb",
          key: "bb",
        },
      ],
    });
    return { register, onSubmit: () => refresh() };
  },
};
</script>
