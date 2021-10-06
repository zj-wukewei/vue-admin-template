import { unref, toRaw } from "vue";
import { isObject, isArray, isNullOrUnDef, isString } from "@/utils/is";
import { cloneDeep, uniqBy } from "lodash-es";
import { deepMerge } from "@/utils";

export function useFormEvents({
  formModel,
  formRef,
  schemaRef,
  getSchema,
  getProps,
  handleFormValues,
}) {
  async function validate() {
    await unref(formRef)?.validate();
    return handleFormValues(toRaw(formModel));
  }

  async function resetFields() {
    await unref(formRef)?.restoreValidation();
    Object.keys(toRaw(formModel)).forEach((key) => {
      formModel[key] = null;
    });
  }

  async function setFieldsValue(values, pathMapToTimeT = true) {
    const schemas = unref(getSchema);
    schemas.forEach((item) => {
      const hasKey = Reflect.has(values, item.path);
      if (hasKey) {
        const value = values[item.path];
        formModel[item.path] = value;
      }
    });
    const pathMapToTime = unref(getProps).pathMapToTime;

    if (!pathMapToTime || !Array.isArray(pathMapToTime) || !pathMapToTimeT) {
      return;
    }
    for (const [path, [startTimeKey, endTimeKey]] of pathMapToTime) {
      if (!path || !startTimeKey || !endTimeKey) {
        continue;
      }
      const schema = unref(getSchema).find((item) => item.path === path);
      if (schema) {
        let dateArray = [];
        if (
          Reflect.has(values, startTimeKey) &&
          !isNullOrUnDef(values[startTimeKey])
        ) {
          dateArray[0] = values[startTimeKey];
        }
        if (
          Reflect.has(values, endTimeKey) &&
          !isNullOrUnDef(values[endTimeKey])
        ) {
          dateArray[1] = values[endTimeKey];
        }
        formModel[path] = dateArray;
      }
    }
  }

  async function updateSchema(data) {
    let updateData = [];
    if (isObject(data)) {
      updateData.push(data);
    }
    if (isArray(data)) {
      updateData = [...data];
    }

    const hasPath = updateData.every(
      (item) => Reflect.has(item, "path") && item.path
    );

    if (!hasPath) {
      throw new Error(
        "All children of the form Schema array that need to be updated must contain the `prop` prop"
      );
    }
    const schema = [];
    updateData.forEach((item) => {
      unref(getSchema).forEach((val) => {
        if (val.path === item.path) {
          const newSchema = deepMerge(val, item);
          schema.push(newSchema);
        } else {
          schema.push(val);
        }
      });
      delete formModel[item.path];
    });
    schemaRef.value = uniqBy(schema, "path");
  }

  async function removeSchemaByPath(path) {
    const schemaList = cloneDeep(unref(getSchema));
    if (!path) {
      return;
    }

    let pathList = isString(path) ? [path] : path;
    if (isString(path)) {
      for (const path of pathList) {
        _removeSchemaByPath(path, schemaList);
      }
      schemaRef.value = schemaList;
    }
  }

  function _removeSchemaByPath(path, schemaList) {
    if (isString(path)) {
      const index = schemaList.findIndex((schema) => schema.path === path);
      if (index !== -1) {
        delete formModel[path];
        schemaList.splice(index, 1);
      }
    }
  }

  return {
    validate,
    resetFields,
    setFieldsValue,
    updateSchema,
    removeSchemaByPath,
  };
}
