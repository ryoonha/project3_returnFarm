import express from "express";
// import { userRegister } from "../models/user";
import db from "../db_Process/sign";

const router = express.Router();

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
  db.userLogin(user_id, user_pwd);
  // res.sendStatus(201); // 회원가입 완료, DB 유저 중복 확인 -> signController에서
});

router.get("/logout", (req, res) => {
  res.sendStatus(200); //ok
});

// module.exports = router;
export default router;
