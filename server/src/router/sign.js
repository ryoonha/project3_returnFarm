import express from "express";
// express의 내부 동작에 컨트롤러 함수가 Promise reject를 한 경우 동기 함수의 에러와 동일하게 처리
// import {} from "express-async-errors";
import * as sign from "../controller/sign";
import { isAuth } from "../middleware/auth";

const router = express.Router();

router.post("/register", sign.register);

router.post("/login", sign.login);

router.get("/logout", isAuth, sign.logout);

export default router;
