import User from "../../models/user";

exports.userInfo = async (user_nick, address) => {
  const result = await User.findOne({
    where: {
      user_nick: user_nick,
      address: address,
    },
    attributes: [
      "user_id",
      "user_nick",
      "user_pfp",
      "address",
      "haes_sal_amount",
      "ip_amount",
      "created_at",
      "crop_count",
      "crop_per",
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
