import { io } from "socket.io-client";

export let socket = io("http://localhost:4000", { transports: ["websocket"] });

export const initSocketConnection = async () => {
  if (socket.connected) return true;
  //socket.emit("newUser", { userName, socketID: socket.id });
  socket.connect();
  return true;
};

export const disconnectSocket = () => {
  if (socket == null || socket.connected === false) {
    return false;
  }
  socket.disconnect();
  //socket = undefined;
  return false;
};
