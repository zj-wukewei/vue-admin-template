import { unref } from "vue";
import { isNullOrUnDef } from "@/utils/is";
import { cloneDeep } from "lodash-es";

export function useFormValues({ getSchema, formModel, getProps }) {
  function handleFormValues(values) {
    const cloneValues = cloneDeep(values);
    const pathMapToTime = unref(getProps).pathMapToTime;
    if (!pathMapToTime || !Array.isArray(pathMapToTime)) {
      return cloneValues;
    }
    for (const [path, [startTimeKey, endTimeKey]] of pathMapToTime) {
      if (!path || !startTimeKey || !endTimeKey || !cloneValues[path]) {
        continue;
      }
      const [startTime, endTime] = cloneValues[path];
      cloneValues[startTimeKey] = startTime;
      cloneValues[endTimeKey] = endTime;
      Reflect.deleteProperty(cloneValues, path);
    }

    return cloneValues;
  }

  function initDefault() {
    const schemas = unref(getSchema);
    schemas.forEach((item) => {
      const { defaultValue } = item;
      if (!isNullOrUnDef(defaultValue)) {
        formModel[item.prop] = defaultValue;
      }
    });
  }

  return {
    handleFormValues,
    initDefault,
  };
}
