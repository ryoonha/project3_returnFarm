import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Chatting from "./chatting/Chatting";
import Exchange from "./exchange/Exchange";
import HotkeyBox from "./hotkeyBox/HotkeyBox";
import Inventory from "./inventory/Inventory";
import MenuBox from "./menuBox/MenuBox";
import Status from "./status/Status";
import useKeyEvents from "../../hooks/useKeyEvents";

// <FontAwesomeIcon icon="fa-solid fa-circle-xmark" /> 닫기 버튼
// <FontAwesomeIcon icon="fa-solid fa-circle-question" /> 도움말 버튼
// <FontAwesomeIcon icon="fa-solid fa-circle-check" /> 확인 버튼

const InterfaceBox = styled.div`
  position: absolute;
  z-index: 100;
`;

const Interface = () => {
  const dispatch = useDispatch();
  const { myInfo, topMenuSelect } = useSelector((state) => state.state);
  useKeyEvents();

  return (
    <InterfaceBox>
      {topMenuSelect === "Status" ? <Status dispatch={dispatch} /> : null}
      {topMenuSelect === "Exchange" ? <Exchange dispatch={dispatch} /> : null}
      {topMenuSelect === "Chatting" ? (
        <Chatting dispatch={dispatch} myInfo={myInfo} />
      ) : null}
      {topMenuSelect === "Inventory" ? <Inventory dispatch={dispatch} /> : null}
      <MenuBox dispatch={dispatch} />
      <HotkeyBox dispatch={dispatch} />
    </InterfaceBox>
  );
};

export default Interface;
