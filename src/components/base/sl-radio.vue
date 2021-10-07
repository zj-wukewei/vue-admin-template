<template>
  <n-radio-group v-bind="currentProps" v-model:value="modelValue">
    <n-radio
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </n-radio>
  </n-radio-group>
</template>

<script>
import { computed, unref } from "vue";
import { useVModel, useProps } from "@/hooks";
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
    const currentProps = useProps(["options"], "componentProps");
    const modelValue = useVModel(props, "value", emit);
    const options = computed(() => unref(props).componentProps.options);
    return { modelValue, currentProps, options };
  },
};
</script>
