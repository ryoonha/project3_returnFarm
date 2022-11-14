import express from "express";
import * as nftController from "../controller/nft.js";

const router = express.Router();

//

// NFT 생성
router.post("/create", (req, res) => {
  const { img, address, metadata } = req.body;
  res.sendStatus(201);
});

// NFT 전송
router.post("/exchange", (req, res) => {
  const { sender_address, taker_address, nft_id } = req.body;
  // if (??) {
  res.sendStatus(400).json({ message: "가스비 부족 등으로 실패..." });
  // } else {
  res.sendStatus(200).json({ message: "민팅 성공" });
  // }
});

// NFT 조회
router.post("/myList", (req, res) => {
  const { user_id } = req.body;
  // if (??) {
  res.sendStatus(400).json({ message: "가스비 부족 등으로 실패..." });
  // } else {
  res.sendStatus(200).json({ img_url, nft_id, metadata });
  // }
});

// NFT 구매
router.post("/buy", (req, res) => {
  const { sender_address, taker_address, nft_id, selling_price } = req.body;
  // if (??) {
  res.sendStatus(400).json({ message: "가스비 부족, 토큰 부족, 실패" });
  // } else {
  res.sendStatus(200).json({ img_url, nft_id, metadata });
  // }
});

export default router;
