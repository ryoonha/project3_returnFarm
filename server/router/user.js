import express from "express";
import * as userController from "../controller/user.js";

const router = express.Router();

router.post("/info", (req, res) => {
  console.log("🍋"); // 🍋
});
export default router;
