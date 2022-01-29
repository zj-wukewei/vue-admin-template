import { watchEffect, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRouter } from "vue-router";
import { parse, stringify } from "query-string";

const parseConfig = {
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: false,
  parseBooleans: true,
  // arrayFormat: 'comma',
};

export default function useTableQuery(params, callBack, setFieldsValue) {
  const [path, paramsStr] = location.hash.slice(1).split("?");
  const router = useRouter();
  const routerPushFn = router.push;
  const stop = watchEffect(() => {
    const [currentPath] = location.hash.slice(1).split("?");
    if (params.value && params.value[0] && currentPath == path) {
      const newParamsStr = stringify(params.value[0], parseConfig);
      routerPushFn(`${path}?${newParamsStr}`);
    }
  });

  if (paramsStr) {
    try {
      const paramsValue = parse(paramsStr, parseConfig);
      console.log("paramsValue", paramsValue);

      callBack(paramsValue);
      onMounted(async () => {
        await nextTick();
        setFieldsValue(paramsValue);
      });
    } catch (error) {
      console.log("useTableQuery", error);
    }
  } else {
    callBack({
      current: 1,
      pageSize: 10,
    });
  }

  onBeforeUnmount(() => {
    stop && stop();
  });
}
