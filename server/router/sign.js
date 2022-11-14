import express from "express";
import * as signController from "../controller/sign.js";
import userRepo, { user_id, user_pwd } from "../data/user.js";

const router = express.Router();

// 회원가입
router.post("/register", (req, res) => {
  const { user_id, user_pwd, user_nick } = req.body;
  const user = userRepo.findByUserId(user_id);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  // 비밀번호도 만들 예정
  // token도 만들 예정
  res.status(201).json({ message: "Welcome to the retun Farm; 🥕" });
});

router.post("/login", (req, res) => {
  const { user_id, user_pwd } = req.body;
  res.sendStatus(201); // 회원가입 완료, DB 유저 중복 확인 -> signController에서
});

router.get("/logout", (req, res) => {
  res.sendStatus(200);
  // res.session.destroy(); 가 필요한지는 공부 필요x
});

export default router;
