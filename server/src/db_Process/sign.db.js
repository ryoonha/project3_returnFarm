import User from "../../models/user";

const userRegister = async (user_id, user_pwd, user_nick) => {
  const result = await User.create({
    user_id,
    user_pwd,
    user_nick,
  })
    .then((e) => [true, e.dataValues])
    .catch((err) => {
      return [false, err.errors[0].message];
    });
  return result;
};

const userLogin = async (user_id, user_pwd) => {
  console.log(user_id, user_pwd, "🌟");
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
    .then((e) => e.dataValues)
    .catch((err) => {
      return false; //아이디나 비번이 일치하지 않습니다
    });
  return result;
};

export { userRegister, userLogin };

//private에서 public으로 변환
