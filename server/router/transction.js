import express from "express";
import * as transController from "../controller/transction.js";

const router = express.Router();

// 아이템 판매 등록
router.post("/sell", (req, res) => {
  console.log("😭"); // 😭
});

// 아이템 전송
router.post("/exchange", (req, res) => {
  console.log("😁"); //😁
});

// 아이템 구매
router.post("/buy", (req, res) => {
  console.log("🥺"); // 🥺
});

export default router;
