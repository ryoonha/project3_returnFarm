import express from "express";
import db from "../db_Process/game";

const router = express.Router();

// * ---------- 가방  ---------- *

// 가방 조회
router.post("/bag", (req, res) => {
  console.log("🥕🥕");
  const { address } = req.body;
  db.gameBag(address);
});

// 가방 생성
router.post("/bagCreate", (req, res) => {
  console.log("🔥"); // 🔥"
  const { address } = req.body;
  db.gameBagcreate(address);
});

// 가방 속 아이템 수정, 삭제
router.put("/bag", (req, res) => {
  console.log("✨"); // ✨
});

// * ---------- 땅  ---------- *

// 땅 조회
router.post("/rand", (req, res) => {
  res.sendStatus(200).json(Rand); // ok
});

// 땅 생성
router.post("/randCreate", (req, res) => {
  console.log("😱"); // 😱
});

// 땅 상호작용, 수정
router.put("/rand", (req, res) => {
  console.log("🤩"); // 🤩
});

export default router;
