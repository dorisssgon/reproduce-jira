//这个组件的目的是把这三个方法封装在provider中，使全局可以调取这三个函数，以及拿到用户信息
import * as auth from "auth-provider";
import React, { useState, ReactNode } from "react";
import { User } from "screens/project-list/search-panel";
import { useMount } from "utils";
import { http } from "utils/http";
interface AuthForm {
  username: string;
  password: string;
}
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => void;
      register: (form: AuthForm) => void;
      logout: () => void;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => {
    auth.login(form).then((user) => setUser(user));
  };
  const register = (form: AuthForm) => {
    auth.register(form).then((user) => setUser(user));
  };
  const logout = () => {
    auth.logout().then(() => setUser(null));
  };
  useMount(() => {
    bootstrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth has to be use in AuthProvider");
  }
  return context;
};
