import Market_item from "../../models/market_item";
import Bag from "../../models/bag";

const transantionSell = async (
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
  console.log("✅", result);
  return result;
};

//🧡item_name, item_count 아닌, 배열리스트로 받아서 UPDATE예정
const transantionExchange = async (item_name, item_count, address) => {
  const arr = [{ [item_name]: item_count }]; //🧡테스트중
  const result = await Bag.findOne({
    where: { address: address },
  }).then((bagData) => {
    if (bagData) {
      bagData.update({ item: arr }).then((e) => console.log(e.dataValues));
    }
  });
};

export { transantionSell, transantionExchange };
