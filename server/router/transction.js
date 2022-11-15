import express from "express";
import * as transController from "../controller/transction.js";

const router = express.Router();

// 아이템 판매 등록
router.post("/sell", (req, res) => {
  const { item_name, item_count, selling_price, address } = req.body;
  // if (??) {
  res.sendStatus(400).json;
  // } else {
  res.sendStatus(201).json;
  // }
});

// 아이템 전송
router.post("/sell", (req, res) => {
  const { item_name, item_count, address } = req.body;
  // if (??) {
  res.sendStatus(401).json;
  // } else {
  res.sendStatus(200).json;
  // }
});

// 아이템 구매
router.post("/sell", (req, res) => {
  const { item_name, item_count, selling_price, address } = req.body;
  // if (??) {
  res.sendStatus(400).json({ message: "구매 실패, 1분 후 다시 시도해주세요." });
  // } else {
  res.sendStatus(200).json;
  // }
});

export default router;
