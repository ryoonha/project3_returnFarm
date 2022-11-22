import express from "express";
import { getMyinfo } from "../controller/user.controller";

const router = express.Router();

router.post("/info", getMyinfo);

export default router;
