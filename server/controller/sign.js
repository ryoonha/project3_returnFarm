import jwt from "jsonwebtoken";
import * as userRepo from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

console.log(userRepo.user_id);

export async function register(req, res) {
  const { user_id, user_pwd, user_nick } = req.body;
  const userRegister = userRepo.create({ user_id, user_pwd, user_nick });
  let user1 = userRegister("abc", 123, "kim");
  console.log(user1);

  // db에서 user_id 찾는다 -> 같은 id 있다면, 이미 가입된 유저
  // const createdId = userRepo.findByUserId(user_id);
  // if (createdId) {
  //   return res.status(409).json({ message: `${user_id} already exists` });
  // }
  // const newUser = await userRepo.createUser(user_id, user_pwd, user_nick);
  // res.status(201);
} // 유저 생성 함수가 이외에 따롱 있는가?

const jwtSecetKey = process.env.JWT_SECRET; // 확인 ㅇㅋ
// console.log(jwtSecretKey);

function jwtToken(id, address) {
  return jwt.sign({ id, address }, jwtSecetKey, {
    expiresIn: "1d",
  });
}
const testToken = jwtToken();
console.log(testToken);

export async function login(req, res) {
  // user_id, user_pwd 받으면 -> 아이디, 비번 확인(db에 있는지)
  const { user_id, user_pwd } = req.body;
  const createdUser = await User.findByUserId(user_id);
  if (!createdUser) {
    return res.status(401).json({ message: "Invalid User" });
  }
  const createdPwd = await User.findByUserPwd(user_pwd);
  if (!createdPwd) {
    res.status(401).json({ message: "Invalid Password" });
  }
  const token = jwtToken(createdUser.id);
  res.status(200).json({ token, message: `Welcome, ${user_nick}!` });
}

// let user1 = [{ user_id: "kim", user_pwd: "a123" }];
