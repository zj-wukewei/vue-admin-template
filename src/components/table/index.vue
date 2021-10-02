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

    function setProps(props) {
      propsRef.value = { ...unref(propsRef), ...props };
    }

    const tableMethods = {
      setProps,
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
    } = usePagination(unref(getMergeProps).api);

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
