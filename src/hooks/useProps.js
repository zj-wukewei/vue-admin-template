import { getCurrentInstance, shallowRef, watchEffect } from "vue";

export function entries(obj) {
  return Object.keys(obj).map((key) => [key, obj[key]]);
}

export default function useProps(excludeKeys = [], key = undefined) {
  const instance = getCurrentInstance();
  if (!instance) return {};

  const props = shallowRef({});
  let currentProps = instance.props;
  if (key) {
    currentProps = currentProps[key];
  }

  watchEffect(() => {
    const res = entries(currentProps).reduce((acm, [key, val]) => {
      if (!excludeKeys.includes(key)) {
        acm[key] = val;
      }

      return acm;
    }, {});

    props.value = res;
  });

  return props;
}
