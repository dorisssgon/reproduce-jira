import { useEffect, useState } from "react";

//avoid the senario when value === 0, !!value means get value boolean
export const isFalsy = (value) => (value === 0 ? false : !value);
//if no value under key, means key equal undefined, remove this key in object
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
//custmize hook
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const debounce = (func, delay) => {
  let timeout;
  return (...param) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...param);
    }, delay);
  };
};

export const useDebounce = (value, delay) => {
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
