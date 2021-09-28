<template>
  <n-modal
    :title="getMergeProps.title"
    v-model:show="visibleRef"
    preset="card"
    class="basic-modal"
    :style="getBodyStyle"
  >
    <div class="content">
      <slot></slot>
    </div>
    <template #footer v-if="getMergeProps.showFooter">
      <n-button @click="visibleRef = false">
        {{ getMergeProps.cancelText }}</n-button
      >
      <n-button
        type="primary"
        :loading="getMergeProps.loading"
        @click="handleOk"
      >
        {{ getMergeProps.okText }}
      </n-button>
    </template>
  </n-modal>
</template>

<script>
import { getCurrentInstance, ref, onMounted, unref, computed } from "vue";
import { deepMerge } from "@/utils";
import { useVModel } from "@/hooks";
export default {
  name: "BasicModal",
  props: {
    title: String,
    loading: Boolean,
    visible: Boolean,
    width: { type: String, default: () => "600px" },
    showFooter: { type: Boolean, default: true },
    okText: { type: String, default: () => "确 定" },
    cancelText: { type: String, default: () => "取 消" },
  },
  emits: ["register", "ok", "update:visible"],
  setup(props, { emit }) {
    const visibleRef = useVModel(props, "visible", emit, { passive: true });
    const propsRef = ref(null);

    const instance = getCurrentInstance();
    const modalMethods = {
      setModalProps,
    };
    function setModalProps(props) {
      propsRef.value = deepMerge(unref(propsRef) || {});
      if (Reflect.has(props, "visible")) {
        visibleRef.value = !!props.visible;
      }
    }
    const getMergeProps = computed(() => {
      return {
        ...props,
        ...unref(propsRef),
      };
    });

    const getBodyStyle = computed(() => {
      return {
        width: unref(propsRef)?.width || props.width,
      };
    });

    if (instance) {
      onMounted(() => {
        emit("register", modalMethods, instance.uid);
      });
    }

    const handleOk = () => {
      emit("ok");
    };

    return { visibleRef, handleOk, getMergeProps, getBodyStyle };
  },
};
</script>

<style lang="less">
.basic-modal {
  .n-card__footer {
    text-align: right;
    width: 100%;
    button + button {
      margin-left: 10px;
    }
  }
}
</style>
