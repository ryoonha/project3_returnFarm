import dotenv from "dotenv";
// dotenv.config() 내에 아무것도 명시해주지 않으면 루트에 있는 .env 파일을 찾아 적용한다.
dotenv.config();
import express from "express";
import cors from "cors";
import { sequelize } from "./models/index";
const app = express();
const port = process.env.SERVER_PORT || 4000;

app.use(cors());

sequelize
  .sync({ force: false }) //기존데이터유지
  .then(() => {
    console.log("데이터 베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app.listen(port, () => {
  console.log("Listening ....port", port);
});
