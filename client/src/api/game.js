import { game } from ".";

export const gameBag = (address) => {
  return game.post("bag", address);
};

export const gameBagUpdate = (itemData) => {
  return game.put("bag", itemData);
};

export const gameRandCreate = (address) => {
  return game.post("rand", address);
};

export const gameRandUpdate = (userRand) => {
  return game.put("rand", userRand);
};
