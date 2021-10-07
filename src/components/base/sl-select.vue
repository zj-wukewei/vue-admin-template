<template>
  <n-select
    v-bind="componentProps"
    v-model:value="modelValue"
    clearable
  ></n-select>
</template>

<script>
import useVModel from "@/hooks/useVModel";
export default {
  name: "sl-select",
  props: {
    componentProps: {
      type: Object,
      default: () => ({
        placeholder: "请选择",
        options: [],
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
