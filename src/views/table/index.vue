<template>
  <BasicTable @register="register"></BasicTable>
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
    const [register] = useTable({
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
    return { register };
  },
};
</script>
