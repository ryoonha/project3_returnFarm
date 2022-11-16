const User = require("../models/user");

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
  })
    .then((e) => e.dataValues.user_id)
    .catch((err) => {
      return "아이디나 비번이 일치하지 않습니다";
    });
  console.log("✅", result);
  return result;
};
