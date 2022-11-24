// const User = require("../../models/user");
import Bag from "../../models/bag";
import Rand from "../../models/rand";
import Sequelize, { where } from "sequelize";

//get-Game/Bag
exports.bag_list = async (address) => {
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

//put-game/bag
exports.bag_update = async (address, bag) => {
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

//post-game/land
exports.land_list = async (address) => {
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

//put-game/land
exports.land_update = async (address, rand) => {
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

exports.bagObj_remove = async (address, item) => {
  const fnSearch = Sequelize.fn(
    "JSON_SEARCH",
    Sequelize.col("item"),
    "one",
    item
  );
  // const fnRemove = Sequelize.fn(
  //   "JSON_REMOVE",
  //   Sequelize.col("item"),
  //   '경로'
  // )
  const result = await Bag.findOne({
    where: {address:address},
    attributes: ["id", "address", "item", [fnSearch, "item_path"]]
  }).then((user) => {
    console.log('😍',user.dataValues)
  })
};
