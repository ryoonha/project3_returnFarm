import { nft } from ".";

export const nftCreate = (nftData) => {
  return nft.post("create", nftData);
};

export const nftTransfer = () => {
  return nft.post("transfer");
};

export const nftMyList = (address) => {
  return nft.post("myList", address);
};

export const nftBuy = () => {
  return nft.post("buy");
};

export const nftSell = (data) => {
  return nft.post("sell", data);
};

export const nftExchange = () => {
  return nft.post("exchange");
};

export const nftIpExchange = () => {
  return nft.post("ipExchange");
};
