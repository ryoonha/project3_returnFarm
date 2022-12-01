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
          time: new Date().toLocaleDateString().slice(0, -1),
        },
        {
          item_name: "삽",
          item_count: "1",
          quality: "1",
          time: new Date().toLocaleDateString().slice(0, -1),
        },
      ],
    },
  }).then((e) => e[0].dataValues.item);
  return result;
};

//post-game/land
exports.land_list = async (address) => {
  // 땅 생성 배열 부분 나중에 수정하기
  // 신규 사용자, 기존 사용자 모두 땅 배열을 만들기 때문에
  // 로딩시간이 길어짐
  // 방법 1 findOrCreate를 분리
  const arrayinit = Array(900).fill({
    status: null,
    add: [],
    estimated_time: null,
  });

  const limit = {
    tree: 0,
    rock: 0,
    grass: 0,
    flowre: 0,
  };
  const array = arrayinit.map((data, index) => {
    const objSelect = Math.floor(Math.random() * 5 + 1);
    if (objSelect === 1 && limit.tree <= 150) {
      limit.tree += 1;
      return {
        status: `나무_${Math.floor(Math.random() * 8 + 1)}`,
        add: [],
        estimated_time: null,
      };
    } else if (objSelect === 2 && limit.rock <= 80) {
      limit.rock += 1;
      return {
        status: `돌_${Math.floor(Math.random() * 5 + 1)}`,
        add: [],
        estimated_time: null,
      };
    } else if (objSelect === 3 && limit.grass <= 300) {
      limit.grass += 1;
      return {
        status: `잡초_${Math.floor(Math.random() * 3 + 1)}`,
        add: [],
        estimated_time: null,
      };
    } else if (objSelect === 4 && limit.flowre <= 100) {
      limit.flowre += 1;
      return {
        status: `꽃_${Math.floor(Math.random() * 2 + 1)}`,
        add: [],
        estimated_time: null,
      };
    }
    return {
      status: null,
      add: [],
      estimated_time: null,
    };
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

//put-game/bag
exports.bagObj_remove = async (address, item, count) => {
  const fnSearch = Sequelize.fn(
    "JSON_SEARCH",
    Sequelize.col("item"),
    "one",
    item
  );

  const result = await Bag.findOne({
    where: { address: address },
    attributes: ["id", "address", "item", [fnSearch, "item_path"]],
  }).then((user) => {
    const idx = user.dataValues.item_path.match(/\d/g)[0];
    const path_split = user.dataValues.item_path.split(".")[0];
    const path = path_split + ".item_count";
    const getNum = user.dataValues.item[idx].item_count;
    const fnRemove = Sequelize.fn(
      "JSON_REMOVE",
      Sequelize.col("item"),
      path_split
    );
    const fnReplace = Sequelize.fn(
      "JSON_REPLACE",
      Sequelize.col("item"),
      path,
      String(Number(getNum) - Number(count))
    );
    if (getNum === count) {
      return Bag.update({ item: fnRemove }, { where: { address: address } })
        .then((e) => Bag.findOne({ where: { address: address } }))
        .then((e) => e.dataValues.item);
    } else if (getNum > count) {
      return Bag.update(
        { item: fnReplace },
        { where: { address: address } }
      ).then((e) =>
        Bag.findOne({ where: { address: address } }).then(
          (e) => e.dataValues.item
        )
      );
    }
  });
  return result;
};
