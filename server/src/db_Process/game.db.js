// const User = require("../../models/user");
import Bag from "../../models/bag";
import Rand from "../../models/rand";

//addr비교해서 기존유저는 item리스트 뱉
//addr비교해서 신규유저라면 기본아이템 넣기 insert
exports.getGameBag = async (address) => {
  const welcomGift = [
    {
      item_name: "물뿌리개",
      item_count: "1",
      quality: "1",
      time: "2022/11/17/13/20",
    },
    {
      item_name: "삽",
      item_count: "1",
      quality: "1",
      time: "2022/11/17/13/20",
    },
  ];
  const result = await Bag.findOne({
    where: {
      address: address,
    },
    attributes: ["item"],
  })
    .then((e) => e.dataValues.item)
    .catch((e) =>
      Bag.create({
        address: address,
        item: welcomGift,
      }).then((e) => {
        return e.dataValues.item;
      })
    );
  return result;
};

exports.putGameBag = async (address, bag) => {
  const result = await Bag.findOne({
    where: {
      address: address,
    },
  })
    .then((user) => {
      return user.update({ item: bag });
    })
    .then((e) => e.dataValues.item);
  return result;
};

exports.randCreate = async (address) => {
  const welcomRand = [
    { seed: null, add: [], estimated_time: "2022/11/17/13/20" },
    { seed: null, add: [], estimated_time: "2022/11/17/13/20" },
  ];
  const result = await Rand.create({
    address: address,
    tile: welcomRand,
  })
    .then((e) => e.dataValues.tile)
    .catch((e) => false);
  return result;
};

exports.getGameRand = async (address) => {
  console.log("디비프로세스의 :", address);
  const result = await Rand.findOne({
    where: {
      address: address,
    },
  }).then((e) => e.dataValues.tile);
  return result;
};