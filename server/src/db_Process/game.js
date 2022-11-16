// const User = require("../../models/user");
import Bag from "../../models/bag";


//addr비교해서 기존유저는 item리스트 뱉
//addr비교해서 신규유저라면 기본아이템 넣기 insert 
exports.gameBag = async (address) => {
  const result = await Bag.findOne({
    where: {
      address: address,
    },
    attributes: ["item"],
  }).then((e) => console.log(e.dataValues));
  return result;
};

exports.gameBagcreate = async (address) => {
  console.log("💃💃💃💃");
};
