import { transaction } from ".";

export const transactionList = () => {
  return transaction.get("list");
};

export const transactionSell = (itemData) => {
  return transaction.post("sell", itemData);
};

export const transactionExchange = (itemData) => {
  return transaction.post("exchange", itemData);
};

export const transactionBuy = (itemData) => {
  return transaction.post("buy", itemData);
};
