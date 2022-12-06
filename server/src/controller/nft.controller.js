import { marketNft_list } from "../db_Process/nft.db";

const list = async (req, res, next) => {
  const marketNftList = await marketNft_list();
  if (marketNftList) {
    res.status(200).send(marketNftList);
  } else {
    res.status(400).send({ message: "거래소 목록을 불러오는데 실패했어요!" });
  }
};

const mint = async (req, res, next) => {};

const nftExchange = async (req, res, next) => {};

const nftBuy = async (req, res, next) => {};

const nftList = async (req, res, next) => {
  const { user_id } = req.body;
};

const nftSell = async (req, res, next) => {};

export { list };
