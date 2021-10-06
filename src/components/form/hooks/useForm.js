import { ref, nextTick, unref, onUnmounted, watch } from "vue";

export function useForm(props) {
  const formRef = ref(null);
  const loadedRef = ref(false);

  async function getForm() {
    const form = unref(formRef);
    if (!form) {
      throw new Error(
        "The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!"
      );
    }
    await nextTick();
    return form;
  }

  function register(instance) {
    onUnmounted(() => {
      formRef.value = null;
      loadedRef.value = null;
    });
    if (unref(loadedRef) && instance === unref(formRef)) return;

    formRef.value = instance;
    loadedRef.value = true;

    watch(
      () => props,
      () => {
        props && instance.setProps(props);
      },
      {
        immediate: true,
        deep: true,
      }
    );
  }

  const methods = {
    validate: async () => {
      const form = await getForm();
      return form.validate();
    },
    setFieldsValue: async (values) => {
      const form = await getForm();
      form.setFieldsValue(values);
    },
    resetFields: async () => {
      const form = await getForm();
      form.resetFields();
    },
    updateSchema: async (data) => {
      const form = await getForm();
      form.updateSchema(data);
    },
    removeSchemaByPath: async (prop) => {
      const form = await getForm();
      form.removeSchemaByPath(prop);
    },
  };

  return [register, methods];
}
