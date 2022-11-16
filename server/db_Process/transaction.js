const Market_item = require("../models/market_item");

exports.transantionSell = async (
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
  }).then((e) => e.dataValues);
  console.log("✅", result);
};

exports.transantionExchange = async (item_name, item_count, address) => {
  const result = await Market_item.findOne({
    where: {
      address: address,
    },
    attributes: ["item_name", "item_count", "address"],
  }).then((e) => console.log(e.dataValues));
};
