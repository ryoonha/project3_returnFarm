import { game } from ".";

export const gameBag = (userAddress) => {
  return game.get("bag", userAddress);
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
