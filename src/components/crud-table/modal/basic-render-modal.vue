<template>
  <BasicModal
    @register="modalRegister"
    @ok="handleOk"
    okText="提交"
    :title="getTitle"
    :loading="loading"
    v-bind="componentProps"
  >
    asasasa{{ data1 }}
  </BasicModal>
</template>

<script>
import { ref } from "vue";
import { BasicModal, useModalInner } from "@/components";

export default {
  name: "basic-render-modal",
  components: { BasicModal },
  emits: ["ok", "register"],
  props: {
    modalId: {
      type: String,
      default: () => "",
    },
    componentProps: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const data1 = ref();
    const [modalRegister, { closeModal }] = useModalInner((data) => {
      console.log("xxxxxxxx", data);
      data1.value = data;
    });

    return {
      modalRegister,
      data1,
      closeModal,
    };
  },
};
</script>
