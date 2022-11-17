import express from "express";
import db from "../db_Process/user";
import * as userInfo from "../controller/user.controller";

const router = express.Router();

router.post("/info", userInfo.getMyinfo);

export default router;
