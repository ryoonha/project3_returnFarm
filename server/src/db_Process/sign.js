import User from "../../models/user";

exports.userRegister = async (user_id, user_pwd, user_nick) => {
  try {
    const result = await User.create({
      user_id,
      user_pwd,
      user_nick,
    });
  } catch (err) {
    console.log("🎉", err.errors[0].message);
    return result;
  }
};
exports.userLogin = async (user_id, user_pwd) => {
  const result = await User.findOne({
    where: {
      user_id: user_id,
      user_pwd: user_pwd,
    },
    attributes: [
      "user_id",
      "user_nick",
      "user_pfp",
      "address",
      "token_amount",
      "created_at",
    ],
  })
    .then((e) =>e.dataValues)
    .catch((err) => {
      return "아이디나 비번이 일치하지 않습니다";
    });
  console.log(":white_check_mark:", result);
  return result;
};
