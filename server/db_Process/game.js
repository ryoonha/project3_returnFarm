import getAttributes from "../models/user";
import Bag from "../models/bag";

exports.gameBag = async (address) => {
  const result = await Bag.findOne({
    where: {
      address: address,
    },
    getAttributes: ["item"],
  }).then((e) => console.log(e));
};
