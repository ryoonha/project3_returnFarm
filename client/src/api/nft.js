import { nft } from ".";

export const nftList = () => {
  return nft.get("list");
};

export const nftCreate = (nftData) => {
  return nft.post("create", nftData);
};

export const nftTransfer = (data) => {
  return nft.post("transfer", data);
};

export const nftMyList = (address) => {
  return nft.post("myList", address);
};

export const nftBuy = (data) => {
  return nft.post("buy", data);
};

export const nftSell = (data) => {
  return nft.post("sell", data);
};

export const nftExchange = (myData) => {
  return nft.post("exchange", myData);
};

export const nftIpExchange = (myData) => {
  return nft.post("ipExchange", myData);
};
