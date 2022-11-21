import { game } from ".";

export const gameBag = (address) => {
  return game.post("bag", address);
};

export const gameBagUpdate = (userData) => {
  return game.put("bag", userData);
};

export const gameRand = (userAddress) => {
  return game.get("rand", userAddress);
};

export const gameRandCreate = (userAddress) => {
  return game.post("randCreate", userAddress);
};

export const gameRandUpdate = (userRand) => {
  return game.put("rand", userRand);
};
