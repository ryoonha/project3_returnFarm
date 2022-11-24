import { game } from ".";

export const gameBag = (address) => {
  return game.post("bag", address);
};

export const gameBagUpdate = (userData) => {
  return game.put("bag", userData);
};

export const gameRandCreate = (address) => {
  return game.post("rand", address);
};

export const gameRandUpdate = (userRand) => {
  return game.put("rand", userRand);
};
