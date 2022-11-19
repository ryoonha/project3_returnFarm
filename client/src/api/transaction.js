import { transaction } from ".";

export const transactionSell = (itemData) => {
  return transaction.post("sell", itemData);
};

export const transactionExchange = (itemData) => {
  return transaction.post("exchange", itemData);
};
