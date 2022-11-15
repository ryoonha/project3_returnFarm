import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { sequelize } from "./models/index";

// 서버 4000, 클라이언트 3000
const PORT = process.env.PORT || 4000;

sequelize
  .sync({ force: false }) //기존데이터유지
  .then(() => {
    console.log("데이터 베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();
app.use(express());
app.use(cors());

// 서버 생성
const webServer = createServer(app);
// 서버 - 소켓 연결
const io = new Server(webServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

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
class Character {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.id = null;
    this.nickName = "";
    this.characterSelect = null;
  }
}
const characterSelect = {
  man: false,
  woman: false,
  Ybot: false,
  Xbot: false,
};

let characterArr = [];
let userSocketIds = [];

function userJoin(id, nickName, select) {
  let character = new Character();
  character.id = id;
  character.nickName = nickName;
  character.characterSelect = select;
  users.push(character);
}

// socket.이벤트 - client 전송
// io.이벤트 - server 전송
io.on("connection", (socket) => {
  // 소켓 연결 알림
  console.log(`${socket.id} 유저가 소켓에 연결되었습니다!`);
  socket.emit("characterSelect", characterSelect);
  //Listens when a new user joins the server
  // userSocketIds.push(socket.id);
  // console.log(userSocketIds);
  socket.on("loginUser", (userinfo) => {
    const [nickName, select] = userinfo;
    console.log(characterSelect[select]);
    console.log(nickName);
    userJoin(socket.id, nickName, select);
    characterSelect[select] = true;
    console.log(userinfo);

    // for (var i = 0; i < users.length; i++) {
    //   let character = users[i];
    //   characterArr.push({
    //     id: character.id,
    //     name: character.name,
    //     x: character.x,
    //     y: character.y,
    //   });
    // }

    // 남들에게 오브젝트로 넘겨주기 때문에 오류 발생!
    // io.emit("join_user", characterArr);
    // socket.broadcast.emit("join_user", {
    //   id: socket.id,
    //   name: newCharacter.name,
    //   x: newCharacter.x,
    //   y: newCharacter.y,
    // });
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
