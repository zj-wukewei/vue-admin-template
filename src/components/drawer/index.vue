<template>
  <n-drawer
    v-model:show="visibleRef"
    :placement="getMergeProps.placement"
    :width="getMergeProps.width"
  >
    <n-drawer-content :title="getMergeProps.title">
      <slot></slot>

      <template #footer v-if="getMergeProps.showFooter">
        <n-space>
          <n-button
            type="primary"
            :loading="getMergeProps.loading"
            @click="handleOk"
          >
            {{ getMergeProps.okText }}
          </n-button>
          <n-button @click="visibleRef = false">取 消</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import { getCurrentInstance, ref, onMounted, unref, computed } from "vue";
import { deepMerge } from "@/utils";
import { useVModel } from "@/hooks";

export default {
  name: "Drawer",
  props: {
    title: { type: String, default: "" },
    visible: { type: Boolean },
    loading: { type: Boolean },
    showFooter: { type: Boolean, default: true },
    width: { type: Number, default: () => 400 },
    okText: { type: String, default: () => "提交" },
    placement: { type: String, default: () => "right" },
  },
  emits: ["register", "ok"],
  setup(props, { emit }) {
    const visibleRef = useVModel(props, "visible", emit, { passive: true });
    const propsRef = ref(null);
    const instance = getCurrentInstance();

    const drawerMethods = {
      setDrawerProps,
    };
    function setDrawerProps(props) {
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

    if (instance) {
      onMounted(() => {
        emit("register", drawerMethods, instance.uid);
      });
    }

    const handleOk = () => {
      emit("ok");
    };

    return {
      visibleRef,
      handleOk,
      getMergeProps,
    };
  },
};
</script>
