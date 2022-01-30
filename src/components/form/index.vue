<template>
  <n-form
    v-bind="getBindValue"
    :model="formModel"
    ref="formRef"
    class="form-schemas"
  >
    <n-grid v-bind="getRow">
      <template v-for="schema in getSchema" :key="schema.path">
        <n-grid-item v-bind="getCol(schema)">
          <n-form-item
            :label="schema.label"
            :path="schema.path"
            v-bind="schema"
          >
            <component
              :is="`sl-${schema.component}`"
              v-model:value="formModel[schema.path]"
              :options="schema.options"
              :componentProps="getComponentProps(schema.componentProps)"
            >
            </component>
          </n-form-item>
        </n-grid-item>
      </template>

      <n-grid-item suffix class="suffix" v-if="getProps.table" #="{ overflow }">
        <n-form-item>
          <n-button type="primary" @click="handleOkClick">确定</n-button>
          <n-button @click="resetFields">取消</n-button>
          <n-button quaternary type="primary" @click="hanldeOnOverflow">
            {{ overflow ? "展开" : "收起" }}

            <template #icon>
              <n-icon size="20">
                <ArrowDown v-if="overflow" />
                <ArrowUp v-if="!overflow" />
              </n-icon>
            </template>
          </n-button>
        </n-form-item>
      </n-grid-item>
    </n-grid>
  </n-form>
</template>

<script>
import { ref, reactive, onMounted, computed, unref, watch, toRaw } from "vue";
import { ArrowDown, ArrowUp } from "@vicons/ionicons5";
import { useFormEvents } from "./hooks/useFormEvents";
import { useFormValues } from "./hooks/useFormValues";
import { useDebounce } from "@/hooks";
import { deepMerge } from "@/utils";
import { isFunction } from "@/utils/is";

export default {
  name: "FormSchemas",
  props: {
    //行内表单模式
    inline: {
      type: Boolean,
      default: true,
    },
    //表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto
    labelWidth: {
      type: Number,
      default: 50,
    },
    //'left' | 'right'
    labelAlign: {
      type: String,
      default: "right",
    },
    labelPlacement: {
      type: String,
      default: "left",
    },
    requireMarkPlacement: {
      type: String,
      default: "right",
    },
    size: {
      type: String,
      default: "medium",
    },
    //是否是table的form
    table: {
      type: Boolean,
      default: () => false,
    },
    //row属性
    rowProps: {
      type: Object,
      default: () => {},
    },
    //col属性
    colProps: {
      type: Object,
      default: () => {},
    },
    //组件配置
    schemas: {
      type: Array,
      default: () => [],
    },
    //但是时间类型组件会进行转换 比如
    //[["anme411", ["startTime", "endTime"]]]
    //会把anme411数值字段，转换成两个字段
    pathMapToTime: {
      type: Array,
      default: () => [],
    },
  },
  components: { ArrowDown, ArrowUp },
  emits: ["register", "onChange", "ok"],
  setup(props, { emit, attrs }) {
    const formModel = reactive({});
    const formRef = ref(null);
    const propsRef = ref(null);
    const schemaRef = ref(null);
    const isInitedDefaultRef = ref(false);

    const gridCollapsed = ref(true);

    const getBindValue = computed(() => ({
      ...attrs,
      ...props,
      ...unref(getProps),
    }));
    const getProps = computed(() => {
      return { ...props, ...unref(propsRef) };
    });

    const getRow = computed(() => {
      const { rowProps, table } = unref(getProps);
      if (table) {
        return {
          ...rowProps,
          collapsed: gridCollapsed.value,
          collapsedRows: 1,
          responsive: "screen",
          cols: "3  m:4 l:4 xl:4 2xl:6",
        };
      }
      return rowProps;
    });

    const getCol = (schema) => {
      const { colProps } = unref(getProps);
      return { ...colProps, ...(schema.colProps || {}) };
    };

    function setProps(formProps) {
      propsRef.value = deepMerge(unref(propsRef) || {}, unref(formProps));
    }

    const getSchema = computed(() => {
      const schemas = unref(schemaRef) || unref(unref(getProps).schemas);
      return schemas;
    });

    const { handleFormValues, initDefault } = useFormValues({
      getSchema,
      formModel,
      getProps,
    });

    const {
      validate,
      setFieldsValue,
      resetFields,
      updateSchema,
      removeSchemaByPath,
    } = useFormEvents({
      formModel,
      formRef,
      propsRef,
      schemaRef,
      getSchema,
      getProps,
      handleFormValues,
    });

    const getComponentProps = (componentProps) => {
      if (isFunction(componentProps)) {
        return componentProps({
          formModel,
          formRef,
          resetFields,
          updateSchema,
          removeSchemaByPath,
        });
      }
      return componentProps;
    };

    const debounceOnchange = useDebounce((values) => {
      emit("onChange", handleFormValues(toRaw(values)));
    }, 300);

    watch(formModel, (values) => debounceOnchange(values));

    watch(
      () => getSchema.value,
      (schema) => {
        if (unref(isInitedDefaultRef)) {
          return;
        }
        if (schema?.length) {
          initDefault();
          isInitedDefaultRef.value = true;
        }
      }
    );

    const formActionType = {
      setProps,
      validate,
      resetFields,
      setFieldsValue,
      updateSchema,
      removeSchemaByPath,
    };

    onMounted(() => {
      initDefault();
      emit("register", formActionType);
    });

    const hanldeOnOverflow = () => {
      gridCollapsed.value = !gridCollapsed.value;
    };

    const handleOkClick = async () => {
      const data = await validate();
      emit("ok", data);
    };

    return {
      formRef,
      getSchema,
      formModel,
      getBindValue,
      getRow,
      getCol,
      getComponentProps,
      getProps,
      resetFields,
      hanldeOnOverflow,
      handleOkClick,
    };
  },
};
</script>

<style lang="less" scoped>
.suffix {
  display: flex;
  justify-content: right;
  margin-right: 30px;

  .action {
    margin-left: 10px;
    display: flex;
    justify-content: center;
  }

  button + button {
    margin-left: 15px;
  }
}
</style>
