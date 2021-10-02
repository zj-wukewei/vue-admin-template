<template>
  <n-data-table
    remote
    ref="tableRef"
    :columns="getMergeProps.columns"
    :data="list"
    :loading="loading"
    :pagination="getMergePagination"
  />
</template>

<script>
import { ref, unref, computed } from "vue";
import { usePagination } from "vue-request";

export default {
  name: "BaiscTable",
  props: {
    rowKey: String || Number,
    api: Function,
    columns: Array,
    pagination: {
      type: Object,
      default: () => ({
        showSizePicker: true,
        pageSizes: [10, 20, 30, 50],
        prefix({ itemCount }) {
          return `总数 ${itemCount}`;
        },
      }),
    },
  },
  emits: ["register"],
  setup(props, { emit, expose }) {
    const tableRef = ref(null);
    const propsRef = ref(null);

    const getMergeProps = computed(() => {
      return {
        ...props,
        ...unref(propsRef),
      };
    });

    const tableMethods = {
      setProps,
      refreshData,
      manualRun,
      refreshStartPage,
    };

    expose(tableMethods);

    emit("register", tableMethods);
    const {
      data,
      current,
      totalPage,
      loading,
      pageSize,
      changeCurrent,
      changePagination,
      refresh,
      run,
      params,
    } = usePagination(unref(getMergeProps).api);

    function manualRun(param) {
      run({
        ...unref(params)[0],
        ...param,
        current: 1,
      });
    }

    function refreshStartPage() {
      run({
        ...unref(params)[0],
        current: 1,
      });
    }

    function refreshData() {
      refresh();
    }

    const getMergePagination = computed(() => ({
      ...unref(getMergeProps).pagination,
      itemCount: data.value?.total || 0,
      pageCount: totalPage.value,
      pageSize: pageSize.value,
      page: current.value,
      onChange: changeCurrent,
      onPageSizeChange: (ps) => {
        changePagination(1, ps);
      },
    }));
    const list = computed(() => data.value?.data || []);

    function setProps(props) {
      propsRef.value = { ...unref(propsRef), ...props };
    }

    return {
      tableRef,
      getMergeProps,
      getMergePagination,
      list,
      loading,
    };
  },
};
</script>
