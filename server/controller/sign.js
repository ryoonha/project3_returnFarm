import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import newUser from "../dbcontrol/userDB";

export async function register(req, res) {
  const { user_id, user_pwd, user_nick } = req.body;
  console.log();
  // db에서 user_id 찾는다 -> 같은 id 있다면, 이미 가입된 유저
  // const createdId = userRepo.findByUserId(user_id);
  // if (createdId) {
  //   return res.status(409).json({ message: `${user_id} already exists` });
  // }
  // const newUser = await userRepo.createUser(user_id, user_pwd, user_nick);
  // res.status(201);
} // 유저 생성 함수가 이외에 따롱 있는가?

var user1 = userRegister(ryoon, 123, ha);
console.log(user1);

const jwtSecetKey = process.env.JWT_SECRET;
// console.log(jwtSecretKey);

// jwt, address와 id는 db에서 가져와서 jwt에 넣는다
function jwtToken(id, address) {
  return jwt.sign({ id, address }, jwtSecetKey, {
    expiresIn: "1d",
  });
}
const testToken = jwtToken();
// console.log(testToken);

// login 로직만 있어서, router->sing.js에서 일단 로그인 시 jwt 발행되는지 확인하기로
export async function login(req, res) {
  // user_id, user_pwd 받으면 -> 아이디, 비번 확인(db에 있는지)
  const { user_id, user_pwd } = req.body;
  const createdUser = await newUser.findByUserId(user_id);
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
