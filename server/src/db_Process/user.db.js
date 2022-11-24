import User from "../../models/user";

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
      "haes_sal_amount",
      "token_amount",
      "created_at",
      "crop_count",
      "crop_per",
      "play_time",
    ],
  })
    .then((e) => e.dataValues)
    .catch((e) => false);
  return result;
};

exports.userPfp = async (address, user_pfp) => {
  const result = await User.findOne({
    where: {
      address: address,
    },
  })
    .then((user) => {
      return user.update({ user_pfp: user_pfp });
    })
    .then((e) => e.dataValues.user_pfp);
  return result;
};
