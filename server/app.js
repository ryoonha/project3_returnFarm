import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

// 서버 4000, 클라이언트 3000
const PORT = process.env.PORT || 4000;

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

// socket.이벤트 - client 전송
// io.이벤트 - server 전송

io.on("connection", (socket) => {
  // 소켓 연결 알림
  console.log(`${socket.id} user just connected!`);

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    io.emit("newUserResponse", users);
  });

  // 소켓 연결 해제
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});
