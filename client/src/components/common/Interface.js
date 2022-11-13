import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { socket } from "../../libs/socketio";
import Chatting from "./chatting/Chatting";
import Exchange from "./exchange/Exchange";
import HotkeyBox from "./hotkeyBox/HotkeyBox";
import Inventory from "./inventory/Inventory";
import MenuBox from "./menuBox/MenuBox";
import Status from "./status/Status";

// <FontAwesomeIcon icon="fa-solid fa-circle-xmark" /> 닫기 버튼
// <FontAwesomeIcon icon="fa-solid fa-circle-question" /> 도움말 버튼
// <FontAwesomeIcon icon="fa-solid fa-circle-check" /> 확인 버튼

const InterfaceBox = styled.div`
  position: absolute;
  z-index: 100;
`;

const Interface = () => {
  const dispatch = useDispatch();
  const select = useSelector((state) => state.state.openState);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      setUsers(data);
    });
  }, [socket, users]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  return (
    <InterfaceBox>
      {select === "Status" ? <Status dispatch={dispatch} /> : null}
      {select === "Exchange" ? <Exchange dispatch={dispatch} /> : null}
      {select === "Chatting" ? (
        <Chatting dispatch={dispatch} users={users} messages={messages} />
      ) : null}
      {select === "Inventory" ? <Inventory dispatch={dispatch} /> : null}
      <MenuBox dispatch={dispatch} />
      <HotkeyBox dispatch={dispatch} />
    </InterfaceBox>
  );
};

export default Interface;
