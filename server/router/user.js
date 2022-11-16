import express from "express";
import * as userController from "../controller/user.js";
import db from "../db_Process/user";

const router = express.Router();
console.log(router);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/info", (req, res) => {
  const { user_id, address } = req.body;
  console.log("🌱🌱🌱🌱🌱");
  db.userInfo(user_id, address);
  // if (user_id === User.user_id) {
  //   res.sendStatus(401);
  // }
  // res.status(201).json(User);
});
module.exports = router;
