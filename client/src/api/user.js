import { user } from ".";

export const userInfo = (userData) => {
  return user.post("info", userData);
};

export const userUpdatePfp = (address) => {
  return user.post("pfp", address);
};
