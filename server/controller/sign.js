import jwt from "jsonwebtoken";
import * as userRepo from "../data/user";

// 나중에 .env 옮기기
const jwtSecetKey = "";

// const token = jwt.sign({
//     // 1. paylad(로그인한 사람 확인 가능하되, 식별 어려운 + 중요한 정보만)
//     id,
//     exp: datetime.utcnow() + timedelta((days = 1)),
//   ,
//   jwtSecetKey,
//   (algorithm = "HS256")}
// ); // jwt 내용은 추후 채우겠음

const token = jwt.sign(
  { id },
  "jwtSecetKey",
  { expiresIn: "1d" },
  (err, token) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(token);
  }
);
