import express from "express";
import {} from "express-async-errors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {
  generateAccessToken,
  tokenValidation,
  generateRefreshToken,
} from "../middleware/validation";
import { userRegister, userLogin } from "../db_Process/sign.db";

const register = async (req, res, next) => {
  const { user_id, user_pwd, user_nick } = req.body;
  console.log(req.body, "🌟");
  const dbResult = await userRegister(user_id, user_pwd, user_nick);
  console.log(dbResult, "🚧");
  const [bool, msg] = dbResult;
  if (!bool) {
    res.status(409).json({ massage: msg }); // 이미 가입한 유저
  } else {
    res.status(201).json({ message: "🎉 SUCCESS!" });
  }
};

const login = async (req, res, next) => {
  const { user_id, user_pwd } = req.body;
  const logined = await userLogin(user_id, user_pwd);
  // 없는 정보로 로그인 한다면
  if (!logined) {
    return res.status(401).json({ message: "회원가입을먼저해주세요" });
  }
  const accessToken = await generateAccessToken(user_id);
  const refreshToken = await generateRefreshToken(user_id);
  console.log(refreshToken, "⚡️");
  res
    .status(200)
    .json({ accessToken, message: `Welcome ${logined.user_nick}🥕` });
};

const logout = async (req, res, next) => {
  // 토큰을 삭제함(?)
  // accessToken 만료?
  // delete id?
};

/*
accessToken이 같다면 refreshToken 발급해서 전달
결국 이전에 발급해준 token이 유효하다면, 새로운 (access) token을 발급해주는 것 = refresh token

1. 로그인했을 때 accessToken, refreshToken 둘 다 발급 (ok)
  이 때, refreshToken은 DB에 저장
2. 시간이 지나서 accessToken이 만료되면(client), accessToken 만료 확인(server) -> tokenValidation
  tokenValidation의 header에 있는 token은 어느 토근이지? 
  둘 다 포스트맨으로 확인해볼 결과, 로그인 가능하고, user정보에도 접근 가능... 
3. client가 만료된 accessToken과 refreshToken으로 accessToken 발급 요청하면,
  server가 refreshToken을 확인하고, 새로운 accessToken 발급 <- 내일 

로직이 너무 복잡해져서, 함수로 나눠서 sign.controller에서 처리하기 
+ 너무 복잡해서; 나중에...
*/

const extension = async (req, res, next) => {
  const tokenData = tokenValidation();
};

export { register, login, logout, extension };
