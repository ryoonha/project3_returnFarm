import express from "express";
import {
  getBag,
  updateBag,
  getRand,
  createRand,
  updateRand,
} from "../controller/game.controller";
import { isAuth } from "../middleware/auth";

const router = express.Router();

router.get("/bag", isAuth, getBag); // 가방 조회
router.put("/bag", updateBag); // 가방 속 아이템 수정, 삭제
router.get("/rand", getRand); // 땅 조회
router.post("/randCreate", createRand); // 땅 생성
router.put("/rand", updateRand); // 땅 상호작용, 수정

export default router;
