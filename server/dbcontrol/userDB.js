import User from "../models/user.js";

export async function userRegister(user_id, user_pwd, user_nick) {
  try {
    const result = await User.create({
      user_id,
      user_pwd,
      user_nick,
    });
  } catch (err) {
    console.log("🚨", err.errors[0].message);
  }
  return result;
}

// var user1 = userRegister(ryoon, 123, ha);
// console.log(user1);
