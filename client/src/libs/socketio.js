import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import {
  handleCharacter,
  handleChat,
  handleUser,
} from "../stores/reducers/socketSlice";

export let socket = io("http://localhost:4000", { transports: ["websocket"] });

export const initSocketConnection = async () => {
  if (socket.connected) return true;
  socket.connect();
  return true;
};

export const disconnectSocket = () => {
  if (socket == null || socket.connected === false) {
    return false;
  }
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
