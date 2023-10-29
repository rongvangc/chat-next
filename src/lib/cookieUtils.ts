import Cookies from "js-cookie";

export const TOKEN_KEY = "Token";

export const setToken = (value: string) => {
  const token = Cookies.set(TOKEN_KEY, value);
  return token ?? "";
};

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  return token ?? "";
};

export const clearToken = () => {
  Cookies.remove(TOKEN_KEY);
};
