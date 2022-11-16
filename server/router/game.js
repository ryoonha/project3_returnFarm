import express from "express";
import * as gameController from "../controller/game.js";

const router = express.Router();

// * ---------- 가방  ---------- *

// 가방 조회
router.get("/bag", (req, res) => {
  res.sendStatus(200).json(Bag); // ok
});

// 가방 생성
router.post("/bag", (req, res) => {
  console.log("🔥"); // 🔥"
});

// 가방 속 아이템 수정, 삭제
router.put("/bag", (req, res) => {
  console.log("✨"); // ✨
});

// * ---------- 땅  ---------- *

// 땅 조회
router.get("/rand", (req, res) => {
  res.sendStatus(200).json(Rand); // ok
});

// 땅 생성
router.post("/rand", (req, res) => {
  console.log("😱"); // 😱
});

// 땅 상호작용, 수정
router.put("/rand", (req, res) => {
  console.log("🤩"); // 🤩
});

export default router;
