import Market_item from "../../models/market_item";
import Bag from "../../models/bag";
import User from "../../models/user";

exports.postTransactionSell = async (
  item_name,
  item_count,
  selling_price,
  address
) => {
  const result = await Market_item.create({
    item_name,
    item_count,
    selling_price,
    address,
  })
    .then((e) => true)
    .catch((err) => false);
  return result;
};

exports.postTransactionExchange = async (address, bag) => {
  const result = await Bag.findOne({
    where: { address: address },
  }).then((bagData) => {
    return bagData.update({ item: bag }).then((e) => e.dataValues);
  });
  return result;
};

//postTransactionBuy
exprtts.tokenAmountUpdate = async (address, token_amount) => {
  const result = await User.update(
    { token_amount: token_amount },
    {
      where: { address: address },
    }
  );
  return result;
};
