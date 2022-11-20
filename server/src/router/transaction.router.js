import express from "express";
import { sell, exchange, buy } from "../controller/transaction.controller.js";

const router = express.Router();

router.post("/sell", sell); // 아이템 판매를 위한 등록
router.post("/exchange", exchange); // 아이템 전송
router.post("/buy", buy); // 아이템 구매

export default router;
