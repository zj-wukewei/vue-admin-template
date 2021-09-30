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

export function useDrawer() {
  const drawer = ref(null);
  const loaded = ref(false);
  const uid = ref("");

  function register(drawerMethod, uuid) {
    if (!getCurrentInstance()) {
      throw new Error(
        "useDrawer() can only be used inside setup() or functional components!"
      );
    }
    uid.value = uuid;
    onUnmounted(() => {
      drawer.value = null;
      loaded.value = false;
      dataTransfer[unref(uid)] = null;
    });
    if (unref(loaded) && drawerMethod === unref(drawer)) return;
    drawer.value = drawerMethod;
  }

  const getInstance = () => {
    const instance = unref(drawer);
    if (!instance) {
      throw new Error("useDrawer instance is undefined!");
    }
    return instance;
  };

  const methods = {
    setDrawerProps: (props) => getInstance()?.setDrawerProps(props),
    openDrawer: (visible = true, data, openOnSet = true) => {
      getInstance()?.setDrawerProps({
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
    changeTitle: (title) => getInstance()?.setDrawerProps({ title: title }),
  };

  return [register, methods];
}

export const useDrawerInner = (callbackFn) => {
  const drawerInstanceRef = ref(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref("");

  const getInstance = () => {
    const instance = unref(drawerInstanceRef);
    if (!instance) {
      throw new Error("useDrawerInner instance is undefined!");
    }
    return instance;
  };

  const register = (drawerInstance, uuid) => {
    if (getCurrentInstance()) {
      onUnmounted(() => {
        drawerInstanceRef.value = null;
      });
    }
    uidRef.value = uuid;
    drawerInstanceRef.value = drawerInstance;
    currentInstance?.emit("register", drawerInstance, uuid);
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
      setDrawerProps: (props) => {
        getInstance()?.setDrawerProps(props);
      },
      changeLoading: (loading = true) => {
        getInstance()?.setDrawerProps({ loading });
      },
      closeDrawer: () => {
        getInstance()?.setDrawerProps({ visible: false });
      },
      changeTitle: (title) => getInstance()?.setDrawerProps({ title: title }),
    },
  ];
};
