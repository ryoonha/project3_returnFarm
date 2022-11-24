import express from "express";
import {
  getBag,
  updateBag,
  searchRand,
  updateRand,
  bagTest,
} from "../controller/game.controller";

const router = express.Router();

router.post("/bag", getBag); // 가방 조회
router.put("/bag", updateBag); // 가방 속 아이템 수정, 삭제
router.post("/rand", searchRand); // 땅 조회 및 지급
router.put("/rand", updateRand); // 땅 상호작용, 수정
router.put("/test", bagTest);

export default router;
