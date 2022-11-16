import express from "express";
<<<<<<< HEAD:server/router/user.js
import * as userController from "../controller/user.js";
=======
>>>>>>> b6f401a39c3099dcd59d947bd1d612e09f174843:server/src/router/user.js
import db from "../db_Process/user";

const router = express.Router();
console.log(router);

router.post("/info", (req, res) => {
  const { user_id, address } = req.body;
  console.log("🌱🌱🌱🌱🌱");
  db.userInfo(user_id, address);
  // if (user_id === User.user_id) {
  //   res.sendStatus(401);
  // }
  // res.status(201).json(User);
});
//module.exports = router;
export default router;
