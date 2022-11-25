import express from "express";
import {
  getBag,
  bagObj_remove,
  searchRand,
  updateRand,
} from "../controller/game.controller";

const router = express.Router();

router.post("/bag", getBag); // 가방 조회
router.put("/bag", bagObj_remove); // 가방 속 아이템 수정, 삭제
router.post("/rand", searchRand); // 땅 조회 및 지급
router.put("/rand", updateRand); // 땅 상호작용, 수정

export default router;
