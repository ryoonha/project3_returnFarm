import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Chatting from "./chatting/Chatting";
import Exchange from "./exchange/Exchange";
import HotkeyBox from "./hotkeyBox/HotkeyBox";
import Inventory from "./inventory/Inventory";
import MenuBox from "./menuBox/MenuBox";
import Status from "./status/Status";
import UseKeyEvents from "../../hooks/useKeyEvents";
import NftList from "./nft/NftList";
import NftExchange from "./nft/NftExchange";
import NftCreate from "./nft/NftCreate";
import TokenExchange from "./nft/TokenExchange";

const InterfaceBox = styled.div`
  position: absolute;
  z-index: 100;
`;

const Interface = () => {
  const dispatch = useDispatch();
  const select = useSelector((state) => state.state.topMenuSelect);

  return (
    <InterfaceBox
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {select === "Status" ? <Status /> : null}
      {select === "Inventory" ? <Inventory select={select} /> : null}
      {select === "NftList" ? <NftList /> : null}
      {select === "Exchange" ? <Exchange /> : null}
      {select === "Chatting" ? <Chatting /> : null}
      {select === "NftExchange" ? <NftExchange /> : null}
      {select === "NftCreate" ? <NftCreate /> : null}
      {select === "TokenExchange" ? <TokenExchange /> : null}
      <MenuBox dispatch={dispatch} />
      <HotkeyBox />
    </InterfaceBox>
  );
};

export default Interface;
