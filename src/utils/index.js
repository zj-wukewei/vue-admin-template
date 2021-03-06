import { isObject } from "@/utils/is";

export function deepMerge(src, target) {
  let key;
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  }
  return src;
}

export const hasPermission = (permissions, pathPermission) => {
  if (permissions.indexOf("*") != -1) return true;
  if (!permissions || pathPermission?.length == 0) return true;
  return permissions.some((perm) => pathPermission?.indexOf(perm) != -1);
};
