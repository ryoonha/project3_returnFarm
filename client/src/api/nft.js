import { nft } from ".";

export const nftCreate = (nftData) => {
  return nft.post("create", nftData);
};

export const nftExchange = () => {
  return nft.post("exchange");
};

export const nftMyList = () => {
  return nft.post("myList");
};

export const nftBuy = () => {
  return nft.post("buy");
};

export const nftSell = () => {
  return nft.post("sell");
};
