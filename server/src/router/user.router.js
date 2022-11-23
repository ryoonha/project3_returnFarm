import express from "express";
import { getMyinfo, updatePfp } from "../controller/user.controller";

const router = express.Router();

router.post("/info", getMyinfo);
router.post("/pfp", updatePfp);

export default router;
