// const User = require("../../models/user");
import Bag from "../../models/bag";
import Rand from "../../models/rand";

//addr비교해서 기존유저는 item리스트 뱉
//addr비교해서 신규유저라면 기본아이템 넣기 insert
exports.getGameBag = async (address) => {
  const welcomGift = [{ 물뿌리개: 1 }, { 삽: 1 }];
  const result = await Bag.findOne({
    where: {
      address: address,
    },
    attributes: ["item"],
  })
    .then((e) => e.dataValues)
    .catch((e) =>
      Bag.create({
        address: address,
        item: welcomGift,
      }).then((e) => {
        item: e.dataValues.item;
      })
    );
  return result;
};

exports.putGameBag = async (address) => {
  console.log("💃💃💃💃");
};

exports.randCreate = async (address) => {
  const welcomRand = [{}, {}];
  const result = await Rand.create({
    address: address,
    tile: welcomRand,
  })
    .then((e) => e.dataValues)
    .catch((e) => false);
  return result;
};
