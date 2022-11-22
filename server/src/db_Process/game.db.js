// const User = require("../../models/user");
import Bag from "../../models/bag";
import Rand from "../../models/rand";

//addr비교해서 기존유저는 item리스트 뱉
//addr비교해서 신규유저라면 기본아이템 넣기 insert
exports.getGameBag = async (address) => {
  const result = await Bag.findOrCreate({
    where: {
      address: address,
    },
    defaults: {
      item: [
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
      ],
    },
  }).then((e) => e[0].dataValues.item);
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

exports.postGameLand = async (address) => {
  const array = Array(100).fill({
    status: null,
    add: [],
    estimated_time: null,
  });
  const result = await Rand.findOrCreate({
    where: { address: address },
    defaults: {
      tile: array,
    },
  })
    .then((e) => e[0].dataValues.tile)
    .catch((e) => e);
  return result;
};

exports.putGameRand = async (address, rand) => {
  const result = await Rand.findOne({
    where: {
      address: address,
    },
  })
    .then((user) => {
      return user.update({ tile: rand });
    })
    .then((e) => e.dataValues.tile);
  return result;
};
