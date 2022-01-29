<template>
  <div class="page-table">
    <BasicTable @register="register"></BasicTable>
  </div>
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
    const schemas = [
      {
        component: "input",
        path: "anme1",
        label: "姓名1",
        rule: {
          required: true,
          message: "请输入电话号码",
          trigger: ["input"],
        },
        componentProps: {
          placeholder: "请输入`333",
        },
      },
      {
        component: "input",
        path: "anme2",
        label: "姓名2",
        rule: {
          required: true,
          message: "请输入电话号码",
          trigger: ["input"],
        },
        componentProps: {
          placeholder: "请输入`333222",
        },
      },
      {
        component: "select",
        path: "sex",
        label: "性别",
        componentProps: {
          placeholder: "请选择",
          options: [
            {
              label: "男",
              value: "1",
            },
            {
              label: "女",
              value: "2",
            },
          ],
        },
      },
      {
        component: "radio",
        path: "sex1",
        label: "性别22",
        componentProps: {
          placeholder: "请选择",
          disabled: true,
          options: [
            {
              label: "男",
              value: "1",
            },
            {
              label: "女",
              value: "2",
            },
          ],
        },
      },
    ];
    const [register, { refresh }] = useTable({
      api: fetcApi,
      schemas: schemas,
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

<style lang="less">
.page-table {
  background: #f3f3f3;
  padding: 20px;
}
</style>
