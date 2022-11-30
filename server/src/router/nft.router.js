import express from "express";
import { createNFT } from "../../API/NFT/createNFT.js";
import { buyNFT } from "../../API/NFT/buyNFT.js";
import { sellNFT } from "../../API/NFT/sellNFT";
import { transferNFT } from "../../API/NFT/transferNFT";
import { NFTList } from "../../API/NFT/NFTList";
import { tokenExchange } from "../../API/NFT/tokenExchange.js";
import { ipExchange } from "../../API/NFT/IpExchange.js";
import { list } from "../controller/nft.controller"
import multer from "multer"; // express에 multer모듈 적용 (for 파일업로드)

let _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
let upload = multer({ storage: _storage });

const router = express.Router();

//marketNFT에 등록된 list
router.get("/list", list);

// 토큰 교환
router.post("/exchange", tokenExchange);

// 토큰 교환 ( 잎 -> 햇살 )
router.post("/ipExchange", ipExchange);

// NFT 생성
router.post("/create", upload.array("file"), createNFT);

// NFT 전송
router.post("/transfer", transferNFT);

// NFT 조회
router.post("/myList", NFTList);

// NFT 구매
router.post("/buy", buyNFT);

// NFT 판매 등록
router.post("/sell", sellNFT);



export default router;
