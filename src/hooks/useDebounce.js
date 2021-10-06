import { unref } from "vue";

function debounceFilter(ms) {
  let timer;
  const filter = (invoke) => {
    const duration = unref(ms);
    if (timer) {
      clearTimeout(timer);
    }
    if (duration < 0) {
      return invoke();
    }

    timer = setTimeout(invoke, duration);
  };
  return filter;
}

function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    filter(() => fn.apply(this, args));
  }

  return wrapper;
}

const useDebounce = (fn, ms) => {
  return createFilterWrapper(debounceFilter(ms), fn);
};

export default useDebounce;
