import jwt from "jsonwebtoken";
import db from "../db_Process/sign";
import dotenv from "dotenv";
dotenv.config();

const AUTH_ERROR = { message: "Authentication Error" };
const jwtSecret = process.env.JWT_SECRET;
// console.log(jwtSecret);

export async function isAuth(req, res, next) {
  const authHeader = req.get("Authorization"); // req의 header에서 Authorization으로 auth 선택
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    // 만약 header에 Auth & Bearer 시작 안하면 에러
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1]; // req의 header의 Auth는 Bearer_token이므로
  jwt.verify(token, jwtSecret, async (error, decoded) => {
    // decoded 실패하면
    if (error) {
      return res.status(401).json(AUTH_ERROR); //
    }
    // 발행해준 토큰 가진 유저라면
    const user = await db.userLogin(decoded.user_id); //
    if (!user) {
      return res.status(401).json(AUTH_ERROR); // 발행한 토큰 유저가 아님
    }
    console.log(decoded); // 발행해준 토큰
    // req.user_id = user.user_id;
    req.user = user; // 이 유저는 계속 이 토큰 사용
    req.token = token;
    next();
  });
}

// console.log(decoded); // 발행해준 토큰이라면
// next();

// const hashed =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibmFtaSIsImlhdCI6MTY2ODYwNTIyMSwiZXhwIjoxNjY4NjkxNjIxfQ.AGxZnx0HXW9d5Wlw4s3lBkA0w9TUWptOlAlAjHlcAn4";
// jwt.verify(hashed, jwtSecret, (error, decoded) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   console.log(decoded);
// });
