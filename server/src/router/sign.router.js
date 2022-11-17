import express from "express";
import * as sign from "../controller/sign.controller";
import { isAuth } from "../middleware/auth"; // <- 삭제,규명님 validation으로 통일

const router = express.Router();

router.post("/register", sign.register);

router.post("/login", sign.login);

router.get("/logout", isAuth, sign.logout);

export default router;
