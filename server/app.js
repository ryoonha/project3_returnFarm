import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
// import { sequelize } from "./models/index";
import signRouter from "./router/sign.js";
import userRouter from "./router/user.js";
import transctionRouter from "./router/transction";
import nftRouter from "./router/nft.js";
import gameRouter from "./router/game.js";

const app = express();
app.use(express());

// 서버 4000, 클라이언트 3000
const PORT = process.env.PORT || 4000;

// * ------------ data base ------------ *

// sequelize
//   .sync({ force: false }) //기존데이터유지
//   .then(() => {
//     console.log("데이터 베이스 연결 성공");
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// * ------------ server 및 router ------------ *

// 서버 생성
const webServer = createServer(app);
// 서버 - 소켓 연결
const io = new Server(webServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// 경로(라우터) 및 에러 처리
app.use("/sign", signRouter);
app.use("/user", userRouter);
app.use("/transction", transctionRouter);
app.use("/nft", nftRouter);
app.use("/game", gameRouter);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

webServer.listen(PORT, () => console.log(` Server is running on ${PORT}`));

// * ------------ socket ------------ *

let users = [];
let initCharacter = {
  x: 0,
  y: 0,
  id: null,
  name: "",
};

function userJoin(socket, userName) {
  let character = initCharacter;
  character.id = socket.id;
  character.name = userName;
  users.push(character);
  return character;
}

// socket.이벤트 - client 전송
// io.이벤트 - server 전송

io.on("connection", (socket) => {
  // 소켓 연결 알림
  console.log(`${socket.id} user just connected!`);
  //Listens when a new user joins the server

  socket.on("newUser", (userName) => {
    let newCharacter = userJoin(socket, userName);
    for (var i = 0; i < users.length; i++) {
      let character = users[i];
      io.emit("join_user", {
        id: character.id,
        name: character.name,
        x: character.x,
        y: character.y,
      });
    }
    socket.broadcast.emit("join_user", {
      id: socket.id,
      name: newCharacter.name,
      x: newCharacter.x,
      y: newCharacter.y,
    });

    io.emit("newUserResponse", users);
  });

  socket.on("send_location", function (data) {
    socket.broadcast.emit("update_state", {
      id: data.id,
      id: data.name,
      x: data.x,
      y: data.y,
    });
  });

  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  // 소켓 연결 해제
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    // 유저 이탈 시 채팅 참가 목록에서 제외 코드 작성하기
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});
