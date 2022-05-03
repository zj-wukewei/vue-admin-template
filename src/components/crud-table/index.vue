<template>
  <template v-for="modal in modals" :key="modal.modalId">
    <component
      :is="modal.is"
      @register="modalsRegister[modal.modalId]"
      :componentProps="modal.componentProps"
    />
  </template>
  <template v-for="action in actions" :key="action.modalId">
    <component
      :is="action.is"
      :modalId="action.modalId"
      :text="action.text"
      :record="action.record"
      :componentProps="action.componentProps"
    />
  </template>
</template>

<script>
import { useModalManager } from "./hooks/useModalManager";
export default {
  name: "crud-table",
  setup() {
    const modals = [
      {
        modalId: "add",
        is: "basic-render-modal",
      },
      {
        modalId: "add1",
        is: "basic-render-modal",
      },
    ];

    const actions = [
      {
        modalId: "add",
        is: "modal-button",
        text: "open",
        record: "open",
      },
      {
        modalId: "add1",
        is: "modal-button",
        text: "open1",
        record: "open1",
      },
    ];

    const { modalsRegister } = useModalManager(modals);

    return { modals, modalsRegister, actions };
  },
};
</script>
