<template>
  <template v-for="modal in modals" :key="modal.modalId">
    <component
      :is="modal.is"
      @register="modalsRegister[modal.modalId]"
      :componentProps="modal.componentProps"
      :render="modal.render"
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
import { h } from "vue";
import { useModalManager } from "./hooks/useModalManager";
export default {
  name: "crud-table",
  setup() {
    const modals = [
      {
        modalId: "add",
        is: "basic-render-modal",
        render: (value) => h("p", value?.aa),
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
        record: {
          aa: "open",
        },
      },
      {
        modalId: "add1",
        is: "modal-button",
        text: "open1",
        record: {
          aa: "open1",
        },
      },
    ];

    const { modalsRegister } = useModalManager(modals);

    return { modals, modalsRegister, actions };
  },
};
</script>
