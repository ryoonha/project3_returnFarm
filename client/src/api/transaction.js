import { transaction } from ".";

export const transactionList = () => {
  return transaction.get("list");
};

export const transactionSell = (itemData) => {
  return transaction.post("sell", itemData);
};

export const transactionExchange = (itemData) => {
  return transaction.put("exchange", itemData);
};

export const transactionBuy = (data) => {
  return transaction.post("buy", data);
};
