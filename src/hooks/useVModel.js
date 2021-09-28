import { getCurrentInstance, computed, ref, watch } from "vue";
export default function useVModel(props, key, emit, options = {}) {
  const { passive = false, eventName, deep = false } = options;
  const vm = getCurrentInstance();
  const _emit = emit || vm?.emit;
  let event = eventName;
  if (!key) {
    key = "modelValue";
  }

  event = eventName || event || `update:${key}`;

  if (passive) {
    const proxy = ref(props[key]);

    watch(
      () => props[key],
      (v) => (proxy.value = v)
    );

    watch(
      proxy,
      (v) => {
        if (v !== props[key] || deep) {
          _emit(event, v);
        }
      },
      {
        deep,
      }
    );

    return proxy;
  } else {
    return computed({
      get() {
        return props[key];
      },
      set(value) {
        _emit(event, value);
      },
    });
  }
}
