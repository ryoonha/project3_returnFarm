import express from "express";
import {
  register,
  login,
  loginExtension,
  logout,
} from "../controller/sign.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/logout", logout);
// 재연장해주면서, accessToken 새로 발급해주는 경로
router.get("/token", loginExtension);
router.delete("/logout", logout);

export default router;
