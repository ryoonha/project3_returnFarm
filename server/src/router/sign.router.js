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
router.post("/refresh", loginExtension);
router.delete("/logout", logout);

export default router;
