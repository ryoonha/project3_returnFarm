import express from "express";
import * as userController from "../controller/user.js";
import User from "../data/user.js";

const router = express.Router();

router.post("/info", (req, res) => {
  const { user_id, address } = req.body;
  if (user_id === User.user_id) {
    res.sendStatus(401);
  }
  res.status(201).json(User);
});
export default router;
