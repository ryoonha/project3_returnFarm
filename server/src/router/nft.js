import express from "express";;
import { createNFT } from "../../API/NFT/createNFT.js";

const router = express.Router();

// NFT 생성
router.post("/create", createNFT);


// NFT 전송
router.post("/exchange");

// NFT 조회
router.post("/myList");

// NFT 구매
router.post("/buy");

// NFT 판매 등록
router.post("/sell");

export default router;
