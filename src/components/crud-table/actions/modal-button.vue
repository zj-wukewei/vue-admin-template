<template>
  <n-button
    v-bind="componentProps"
    type="primary"
    @click="() => actions.openModalId(modalId, record)"
  >
    {{ text }}
  </n-button>
</template>

<script>
import { useModalsActionsContext } from "../hooks/useModalManager";
export default {
  name: "ModalButton",
  props: {
    record: {
      type: Object,
      default: null,
    },
    modalId: {
      type: String,
      default: () => "",
    },
    text: {
      type: String,
      default: () => "开启modal",
    },
    componentProps: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const actions = useModalsActionsContext();
    return { actions };
  },
};
</script>
