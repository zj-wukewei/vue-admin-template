import {
  ref,
  getCurrentInstance,
  onUnmounted,
  unref,
  reactive,
  watchEffect,
  nextTick,
  toRaw,
} from "vue";
import { isEqual } from "lodash-es";
import { isFunction } from "@/utils/is";

//数据转化监听
const dataTransfer = reactive({});

export function useModal() {
  const modal = ref(null);
  const loaded = ref(false);
  const uid = ref("");

  function register(modalMethod, uuid) {
    if (!getCurrentInstance()) {
      throw new Error(
        "useModal() can only be used inside setup() or functional components!"
      );
    }
    uid.value = uuid;
    onUnmounted(() => {
      modal.value = null;
      loaded.value = false;
      dataTransfer[unref(uid)] = null;
    });
    if (unref(loaded) && modalMethod === unref(modal)) return;
    modal.value = modalMethod;
  }

  const getInstance = () => {
    const instance = unref(modal);
    if (!instance) {
      throw new Error("useModal instance is undefined!");
    }
    return instance;
  };

  const methods = {
    setModalProps: (props) => getInstance()?.setModalProps(props),
    openModal: (visible = true, data, openOnSet = true) => {
      getInstance()?.setModalProps({
        visible: visible,
      });
      if (!data) return;
      const id = unref(uid);
      if (openOnSet) {
        dataTransfer[id] = null;
        dataTransfer[id] = toRaw(data);
        return;
      }
      const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data));
      if (!equal) {
        dataTransfer[id] = toRaw(data);
      }
    },
    changeTitle: (title) => getInstance()?.setModalProps({ title: title }),
  };

  return [register, methods];
}

export const useModalInner = (callbackFn) => {
  const modalInstanceRef = ref(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref("");

  const getInstance = () => {
    const instance = unref(modalInstanceRef);
    if (!instance) {
      throw new Error("useModalInner instance is undefined!");
    }
    return instance;
  };

  const register = (modalInstance, uuid) => {
    console.log("useModalInner register");
    if (getCurrentInstance()) {
      onUnmounted(() => {
        modalInstanceRef.value = null;
      });
    }
    uidRef.value = uuid;
    modalInstanceRef.value = modalInstance;
    currentInstance?.emit("register", modalInstance, uuid);
  };

  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)];
    if (!data) return;
    if (!callbackFn || !isFunction(callbackFn)) return;
    nextTick(() => {
      callbackFn(data);
    });
  });

  return [
    register,
    {
      setModalProps: (props) => {
        getInstance()?.setModalProps(props);
      },
      changeLoading: (loading = true) => {
        getInstance()?.setModalProps({ loading });
      },
      closeModal: () => {
        getInstance()?.setModalProps({ visible: false });
      },
      changeTitle: (title) => getInstance()?.setModalProps({ title: title }),
    },
  ];
};
