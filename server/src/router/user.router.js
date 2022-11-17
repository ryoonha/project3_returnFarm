import express from "express";
import * as userInfo from "../controller/user.controller";

const router = express.Router();

router.post("/info", userInfo.getMyinfo);

export default router;
