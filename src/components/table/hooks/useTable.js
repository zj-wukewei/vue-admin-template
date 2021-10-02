import { ref, watch, onUnmounted, unref } from "vue";

export function useTable(tableProps) {
  const tableRef = ref(null);
  const loadedRef = ref(false);
  const formRef = ref(null);

  let stopWatch;

  function register(instance, formInstance) {
    onUnmounted(() => {
      tableRef.value = null;
      loadedRef.value = null;
    });

    if (unref(loadedRef) && instance === unref(tableRef)) return;

    tableRef.value = instance;
    formRef.value = formInstance;
    tableProps && instance.setProps(tableProps);
    loadedRef.value = true;

    stopWatch && stopWatch?.();

    stopWatch = watch(
      () => tableProps,
      () => {
        tableProps && instance.setProps(tableProps);
      },
      {
        immediate: true,
        deep: true,
      }
    );
  }

  function getTableInstance() {
    const table = unref(tableRef);
    if (!table) {
      throw new Error(
        "The table instance has not been obtained yet, please make sure the table is presented when performing the table operation!"
      );
    }
    return table;
  }

  const methods = {
    refresh: () => getTableInstance().refreshData(),
    manualRun: (params) => getTableInstance().manualRun(params),
    refreshStartPage: () => getTableInstance().refreshStartPage(),
  };

  return [register, methods];
}
