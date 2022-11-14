import express from "express";
import * as gameController from "../controller/game.js";
import Bag from "../data/bag.js";
import Rand from "../data/rand.js";

const router = express.Router();

// * ---------- 가방  ---------- *

// 가방 조회
router.get("/bag", (req, res) => {
  res.sendStatus(200).json(Bag);
});

// 가방 생성
router.post("/bag", (req, res) => {
  const { user_id, address } = req.body;
  res.sendStatus(201).json(Bag);
});

// 가방 속 아이템 수정, 삭제
router.update("/bag", (req, res) => {
  const [{ ...bag }] = req.body;
  res.sendStatus(200);
});

// * ---------- 땅  ---------- *

// 땅 조회
router.get("/rand", (req, res) => {
  res.sendStatus(200).json(Rand); // 땅 데이터
});

// 땅 생성
router.post("/rand", (req, res) => {
  const { address } = req.body;
  res.sendStatus(201).json(Rand); // 땅 데이터
});

// 땅 상호작용, 수정
router.update("/rand", (req, res) => {
  const [{ ...rand }] = req.body;
  res.sendStatus(200);
});

export default router;
