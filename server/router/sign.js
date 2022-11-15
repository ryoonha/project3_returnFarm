import express from "express";
import { validationResult, body } from "express-validator";
import * as signController from "../controller/sign.js";

const router = express.Router();

/*
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400);
};

// 회원가입, 로그인 유효성 검사
const signValidate = [
  body("user_id").trim().notEmpty(),
  body("user_pwd")
    .trim()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("password should be at least 5 characters"),
  validate,
];
*/

// router.post("/register", signController.register);

// router.post("/login", signController.login);

// router 연결 확인
router.post("/register", (req, res) => {
  console.log("🔎"); // 🔎
});

router.post("/login", (req, res) => {
  console.log("🌟"); // 🌟
});

router.get("/logout", (req, res) => {
  res.sendStatus(200); //ok
});

export default router;
