import express from "express";
import db from "../db_Process/user";
import * as userInfo from "../controller/user";
import { isAuth } from "../middleware/auth";

const router = express.Router();

// router.post("/info", (req, res) => {
//   const { user_id, address } = req.body;
//   console.log("🌱🌱🌱🌱🌱");
//   db.userInfo(user_id, address);
//   // if (user_id === User.user_id) {
//   //   res.sendStatus(401);
//   // }
//   // res.status(201).json(User);
// });
// //module.exports = router;

// 토큰을 가진 유저여야만 정보 확인 가능 -> isAuth 추가
router.post("/info", isAuth, userInfo.searchMyInfo);

export default router;
