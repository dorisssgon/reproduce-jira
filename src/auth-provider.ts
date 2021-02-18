//如果使用firebase这种第三方auth服务，不需要开发者再开发此文件
//这个组件主要做的是对得到的token进行存储和fetchcall方法
import { User } from "./screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = "__autho_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);
//这里有问题 不懂user和{user}的区别,取决于传什么进来
//如果传{token:,name,}就直接user:User，如果传进来的是{user:{token,name}},就要{user}:{user:User}
//传进来的是一个object，所以此user是一个jsonstingify的文件 是第二种情况，所以要用
export const handleUserResponse = ({ user }: { user: User }) => {
  console.log("jiankong user");
  console.log(user);
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
