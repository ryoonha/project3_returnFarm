import { user } from ".";

export const userInfo = (userData) => {
  return user.post("info", userData);
};
