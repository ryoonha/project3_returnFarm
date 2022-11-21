import { game } from ".";

export const gameBag = () => {
  return game.get("bag");
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
