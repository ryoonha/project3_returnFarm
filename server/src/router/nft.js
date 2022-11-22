import express from "express";;
import { createNFT } from "../../API/NFT/createNFT.js";
import { buyNFT } from "../../API/NFT/buyNFT.js";
import { sellNFT } from "../../API/NFT/sellNFT";
import { exchangeNFT } from "../../API/NFT/exchangeNFT";
import { NFTList } from "../../API/NFT/NFTList";

import multer from 'multer'; // express에 multer모듈 적용 (for 파일업로드)
let _storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
let upload = multer({ storage: _storage })
  


const router = express.Router();

// NFT 생성
router.post("/create", upload.single('file'), createNFT);


// NFT 전송
router.post("/exchange", exchangeNFT);

// NFT 조회
router.post("/myList", NFTList);

// NFT 구매
router.post("/buy", buyNFT);

// NFT 판매 등록
router.post("/sell", sellNFT);

export default router;
