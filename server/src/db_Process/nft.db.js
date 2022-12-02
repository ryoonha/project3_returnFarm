import Market_nft from "../../models/market_nft";

//get-nft/list
exports.marketNft_list = async () => {
  const result = await Market_nft.findAll();
  return result;
};
