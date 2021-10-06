<template>
  <n-input v-bind="componentProps" v-model:value="modelValue"></n-input>
</template>

<script>
import useVModel from "@/hooks/useVModel";
export default {
  name: "sl-input",
  props: {
    componentProps: {
      type: Object,
      default: () => ({
        placeholder: "请输入",
        type: "text",
      }),
    },
    value: undefined,
  },
  setup(props, { emit }) {
    const modelValue = useVModel(props, "value", emit);
    return { modelValue };
  },
};
</script>
