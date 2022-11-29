import Market_item from "../../models/market_item";
import Bag from "../../models/bag";
import User from "../../models/user";
import Sequelize, { where } from "sequelize";

//get-Transaction/List
exports.marketItem_list = async () => {
  const result = await Market_item.findAll();
  return result;
};

//post-Transaction/Sell
exports.marketItem_create = async (
  item_name,
  item_count,
  selling_price,
  address,
  time,
  quality
) => {
  const result = await Market_item.create({
    item_name,
    item_count,
    selling_price,
    address,
    time,
    quality,
  })
    .then((e) => true)
    .catch((err) => false);
  return result;
};

//put-Transaction/Exchange (post에서 put으로변경)
exports.bag_update = async (address, nItem) => {
  const fnSearch = Sequelize.fn(
    "JSON_SEARCH",
    Sequelize.col("item"),
    "one",
    nItem.item_name
  );
  const result = await Bag.findOne({
    where: { address: address },
    attributes: ["id", "address", "item", [fnSearch, "item_path"]],
  }).then((user) => {
    if (user.dataValues.item_path != null) {
      const path_split = user.dataValues.item_path.split(".")[0];
      const path = path_split + ".item_count";
      const idx = path.match(/\d/g)[0];
      const fnReplace = Sequelize.fn(
        "JSON_REPLACE",
        Sequelize.col("item"),
        path,
        String(
          Number(nItem.item_count) +
            Number(user.dataValues.item[idx].item_count)
        )
      );
      return user
        .update({
          item: fnReplace,
        })
        .then((e) => Bag.findOne({ where: { address: address } }))
        .then((r) => r.dataValues.item);
    } else {
      const array = [];
      for (let i in nItem) {
        if (
          i === "createdAt" ||
          i === "selling_price" ||
          i === "address" ||
          i === "id"
        ) {
          continue;
        }
        array.push(i);
        array.push(nItem[i]);
      }
      const fnAppend = Sequelize.fn(
        "JSON_ARRAY_APPEND",
        Sequelize.col("item"),
        "$",
        Sequelize.fn("JSON_OBJECT", ...array)
      );
      return user
        .update({
          item: fnAppend,
        })
        .then((e) => Bag.findOne({ where: { address: address } }))
        .then((e) => e.dataValues.item);
    }
  });
  return result;
};

//post-Transaction/Buy
exports.tokenAmount_update = async (address, haes_sal_amount) => {
  const result = await User.findOne({
    where: {
      address: address,
    },
    attributes: ["id", "address", "haes_sal_amount"],
  })
    .then((user) => {
      return user.update({ haes_sal_amount: haes_sal_amount });
    })
    .then((e) => e.dataValues);
  return result;
};

exports.marketItem_delete = async (item) => {
  const result = await Market_item.destroy({
    where: { id: item.id, address: item.address, item_name: item.item_name },
  }).then(() => Market_item.findAll());
  return result;
};
