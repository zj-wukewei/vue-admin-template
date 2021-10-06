<template>
  <div>
    <span>表格搜索三个以下</span>
    <FormSchemas @register="register" @onChange="handleOnChange"></FormSchemas>

    <n-button type="primary" @click="validate"> validate </n-button>
    <n-button type="primary" @click="resetFields"> resetFields </n-button>
    <n-button type="primary" @click="setFieldsValue"> setFieldsValue </n-button>
  </div>
</template>

<script>
import { FormSchemas, useForm } from "@/components";
export default {
  name: "test",
  components: { FormSchemas },
  setup() {
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
    ];
    const propMapToTime = [["anme411", ["startTime", "endTime"]]];

    const [register, { validate, resetFields, setFieldsValue }] = useForm({
      colProps: {
        span: 6,
      },
      labelWidth: "100px",
      schemas: schemas,
      propMapToTime,
    });

    console.log("validate", validate);

    return {
      register,
      validate: () => {
        validate().then((data) => {
          console.log("validatevalidate", data);
        });
      },
      resetFields: () => {
        resetFields();
      },
      handleOnChange: (v) => console.log("handleOnChange", v),
      schemas,
      setFieldsValue: () => {
        setFieldsValue({
          anme1: "sasas",
          anme2: "xasxas",
        });
      },
      propMapToTime,
      onSearch: (v) => console.log("onSearchonSearch", v),
    };
  },
};
</script>
