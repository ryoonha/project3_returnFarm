import express from "express";
import {} from "express-async-errors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import db from "../db_Process/sign";

// ----------------------* JWT token *----------------------

const id = db.userLogin.user_id;
function createJwt(id) {
  // 토큰 생성
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3h" });
}
const token = createJwt(id);
// console.log(token);

// ----------------------* sign API *----------------------

export async function register(req, res) {
  const { user_id, user_pwd, user_nick } = req.body;
  console.log(req.body, "🌟");
  const OLD = await db.userRegister(user_id, user_pwd, user_nick);
  // console.log(OLD, "🚧");
  if (OLD) {
    return res.status(409); // 이미 가입한 유저
  }
  db.userRegister(user_id, user_pwd, user_nick);
  console.log(token, "🕵🏻‍♂️");
  res.status(201).json({ message: "🎉 SUCCESS!" });
}

export async function login(req, res) {
  const { user_id, user_pwd } = req.body;
  // console.log(req.body, "🌽");
  const logined = await db.userLogin(user_id, user_pwd);
  // 없는 정보로 로그인 한다면
  console.log(logined, "🥦");
  if (!logined) {
    return res.status(401);
  }
  db.userLogin(user_id, user_pwd); // 로그인
  // const token = createJwt(user_id); // 생성한 토큰 발급, 토큰은 보안을 위해 메세지에 포함시키지 않음
  console.log(token, "🚨");
  res.status(200).json({ message: `Welcome ${logined.user_nick}🥕` });
}

export async function logout(req, res) {
  try {
    // 발급된 토큰을 clearCookie 한다 ? -> clearCookie 함수 만들어야 함 -> 서버에서 jwt 없애는 건 안 됨 -> 만료시간 짧게...
    console.log(token); // <- 토큰이 사라지는 걸 확인할 순 없었음
    console.log("successfully logout 👋🏻");
  } catch (error) {
    res.sendStatus(500);
  }
}
