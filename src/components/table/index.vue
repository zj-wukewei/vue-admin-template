<template>
  <div v-if="hasTableForm" class="table-search">
    <FormSchemas @register="register" @ok="handleOkFormClick" />
  </div>
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
import FormSchemas from "../form";
import { useForm } from "../form/hooks/useForm";
import useTableQuery from "./hooks/useTableQuery";

export default {
  name: "BaiscTable",
  components: { FormSchemas },
  props: {
    rowKey: String || Number,
    api: Function,
    columns: Array,
    labelWidth: {
      type: Number,
      default: () => 100,
    },
    //头部form组件配置
    schemas: {
      type: Array,
      default: () => [],
    },
    pathMapToTime: {
      type: Array,
      default: () => [],
    },
    syncQuryUrl: {
      type: Boolean,
      default: () => false,
    },
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

    const hasTableForm = computed(() => {
      const { schemas } = unref(getMergeProps);
      return schemas && schemas.length > 0;
    });

    const formProps = computed(() => {
      const { schemas, propMapToTime } = unref(getMergeProps);
      return {
        table: true,
        labelWidth: "100px",
        schemas: schemas,
        propMapToTime: propMapToTime,
      };
    });

    const [register, { setFieldsValue }] = useForm(formProps);

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
      total,
      totalPage,
      loading,
      pageSize,
      changeCurrent,
      changePagination,
      refresh,
      run,
      params,
    } = usePagination(unref(getMergeProps).api, {
      manual: !!unref(getMergeProps).syncQuryUrl,
    });

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

    if (unref(getMergeProps).syncQuryUrl) {
      useTableQuery(params, run, setFieldsValue);
    }

    function refreshData() {
      refresh();
    }

    const getMergePagination = computed(() => ({
      ...unref(getMergeProps).pagination,
      itemCount: total.value || 0,
      pageCount: Number(totalPage.value),
      pageSize: Number(pageSize.value),
      page: Number(current.value),
      onChange: changeCurrent,
      onPageSizeChange: (ps) => {
        changePagination(1, ps);
      },
    }));
    const list = computed(() => data.value?.data || []);

    function setProps(props) {
      propsRef.value = { ...unref(propsRef), ...props };
    }

    const handleOkFormClick = (data) => {
      manualRun(data);
    };
    return {
      tableRef,
      getMergeProps,
      getMergePagination,
      list,
      loading,
      hasTableForm,
      handleOkFormClick,
      register,
    };
  },
};
</script>

<style lang="less">
.table-search {
  padding: 24px 24px 0;
  background: #fff;
  margin-bottom: 16px;
}
</style>
