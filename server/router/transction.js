import express from "express";
// import * as transController from "../controller/transction.js";
const db = require("../db_Process/transaction")

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// 아이템 판매 등록
router.post("/sell", (req, res) => {
  const { item_name, item_count, selling_price, address } = req.body;
  console.log("🌱🌱transaction/sell도착🌱🌱");
  db.transantionSell(item_name, item_count, selling_price, address);
  // if (??) {
  // res.sendStatus(400).json;
  // // } else {
  // res.sendStatus(201).json;
  // }
});

// // 아이템 전송 -> 보류 가방API완료시 작성예정
router.post("/exchange", (req, res) => {
  const { item_name, item_count, address } = req.body;
  console.log("🌱🌱transaction/exchange도착🌱🌱");
  db.transantionExchange(item_name, item_count, address);
  // if (??) {
  // res.sendStatus(401).json;
  // // } else {
  // res.sendStatus(200).json;
  // }
});

// // 아이템 구매
// router.post("/sell", (req, res) => {
//   const { item_name, item_count, selling_price, address } = req.body;
//   // if (??) {
//   res.sendStatus(400).json({ message: "구매 실패, 1분 후 다시 시도해주세요." });
//   // } else {
//   res.sendStatus(200).json;
//   // }
// });

module.exports = router;
