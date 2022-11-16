import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// import { userRegister } from "../models/user";
const User = require("../models/user");
const router = express.Router();
import db from "../db_Process/sign";

// 회원가입
router.post("/register", (req, res) => {
  console.log("🥕🥕🥕🥕🥕🥕");
  const { user_id, user_pwd, user_nick } = req.body;
  const user = db.userRegister(user_id, user_pwd, user_nick);
  // if (!user) {
  //   return res.status(401).json({ message: "Invalid user or password" });
  // }
  // // 비밀번호도 만들 예정
  // // token도 만들 예정
  // res.status(201).json({ message: "Welcome to the retun Farm; 🥕" });
});

router.post("/login", (req, res) => {
  console.log("🥕🥕🥕🥕🥕🥕");
  const { user_id, user_pwd } = req.body;
  const loginIdPassword = db.userLogin(user_id, user_pwd); // <- 추가
  const token = jwtToken(loginIdPassword); // <- 추가
  const loginedUserNick = db.user_nick; // <- 추가
  res.status(200).json({ token, message: `Welcome, ${loginedUserNick}!` }); // <- 추가
});

router.get("/logout", (req, res) => {
  res.sendStatus(200); //ok
});

const jwtSecetKey = process.env.JWT_SECRET;
// console.log(jwtSecetKey); 키값 확인
// const testToken = jwtToken();
// console.log(testToken); 발행 확인

// jwt(nick, address, token_amout, create_at) 담아서 보낸다

async function test() {
  const callUserInfo = await User.findOne({
    where: { user_id: "kim", user_pwd: "123!" },
  });
  const userInfo = callUserInfo.dataValues;
  console.log(userInfo);
}
test();

function jwtToken(user_id, address, user_nick, token_amout, create_at) {
  return jwt.sign(
    { id: user_id, address, user_nick, token_amout, create_at },
    jwtSecetKey,
    {
      expiresIn: "1d",
    }
  );
}
export default router;
