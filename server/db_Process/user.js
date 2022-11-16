const User = require("../models/user");

exports.userInfo = async (user_id, address) => {
  const result = await User.findOne({
    where: {
      user_id: user_id,
      address: address,
    },
    attributes: [
      "user_id",
      "user_nick",
      "user_pfp",
      "address",
      "token_amount",
      "created_at",
    ],
  }).then((e) => e.dataValues);
  console.log("✅", result);
};
