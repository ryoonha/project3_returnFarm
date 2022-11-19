import { sign } from ".";

export const signRegister = (userData) => {
  return sign.post("register", userData);
};

export const signLogin = (userData) => {
  return sign.post("login", userData);
};

export const signLogout = () => {
  return sign.get("logout");
};
