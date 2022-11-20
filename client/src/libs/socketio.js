import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import {
  handleCharacter,
  handleChat,
  handleUser,
} from "../stores/reducers/chatSlice";

export let socket = io("http://localhost:4000", { transports: ["websocket"] });

export const initSocketConnection = async (userData) => {
  if (socket.connected) {
    socket.emit("loginUser", userData);
    return true;
  }
  socket.connect();
  socket.emit("loginUser", userData);
  return true;
};

export const disconnectSocket = () => {
  if (socket == null || socket.connected === false) {
    return false;
  }
  console.log(socket);
  // io.emit("disconnect", data);
  socket.disconnect();
  return false;
};

export const SocketIo = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      dispatch(handleUser({ user: data }));
    });
  }, [socket]);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      dispatch(handleChat({ chat: data }));
    });
  }, [socket]);
};
