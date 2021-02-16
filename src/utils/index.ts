import { useEffect, useState } from "react";

//avoid the senario when value === 0, !!value means get value boolean
export const isFalsy = (value: any) => (value === 0 ? false : !value);
//if no value under key, means key equal undefined, remove this key in object
export const cleanObject = (object: Object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    //@ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};
//custmize hook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// export const debounce = (func, delay) => {
//   let timeout;
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(() => {
//       func(...param);
//     }, delay);
//   };
// };
//if user do not have the param delay, define it with ?
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    //原理跟debounce相同，useeffect的return可以视为willunmount
    //每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    //每次在上一个useeffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

export const useArray = <p>(arr: p[]) => {
  const [initialArray, setInitialValue] = useState(arr);
  return {
    value: initialArray,
    clear: () => setInitialValue([]),
    removeIndex: (num: number) => {
      let result = initialArray.slice();
      result.splice(num, 1);
      setInitialValue(result);
    },
    add: (p: p) => {
      let r = initialArray.slice();
      r.push(p);
      setInitialValue(r);
    },
  };
};
