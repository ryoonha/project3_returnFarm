import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleTopMenu, sellChange } from "../../../stores/reducers/stateSlice";
import { useSelector } from "react-redux";
import { weatherData } from "../../../data/etc";

const MenuContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 70px;
  border-radius: 0px 0px 10% 10%;
  background-color: rgba(133, 133, 133, 0.4);
  transform: ${(props) =>
    props.hide ? "translateY(-70px)" : "translateY(0px)"};
  transition: 0.3s;
  // overflow: hidden;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-0px);
    font-size: 24px;
    transition: 0.2s;
  }

  .streamlineBox {
    position: absolute;
    bottom: -24px;
    background-color: rgba(133, 133, 133, 0.4);
    div {
      font-size: 16px;
      width: 80px;
    }
    .haetsal {
      background-color: #c06868;
    }
    .time {
      background-color: rgba(58, 78, 194, 0.425);
    }
    .tokenAmount {
      background-color: #dacc4f;
    }
  }

  .weatherBox {
    width: 90px;
    height: 90px;
    border-radius: 50%;

    .weather {
      width: 50px;
      height: 50px;
      background-color: rgb(255, 255, 255);
      border-radius: 50%;
      color: ${(props) => (props.weather === "sun" ? "#ff4931" : "#c9d651")};
      animation: ${(props) =>
        props.weather === "sun"
          ? "sunRotation 5s infinite linear forwards"
          : "moonRotation 5s infinite forwards"};

      :hover {
        font-size: 30px;
      }
    }
  }

  @keyframes sunRotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes moonRotation {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-40deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

const Menu = styled.div`
  width: 70px;
  height: 50px;
  background-color: rgba(233, 255, 255, 1);
  border-radius: 10%;
  margin: 0px 5px 0px 5px;

  :hover {
    transition: 0.2s;
    background-color: rgb(255, 240, 212);
    font-size: 30px;
    outline: 1px solid rgba(133, 133, 133, 0.4);
    ${(props) =>
      css`
        ::before {
          content: "${props.text}";
        }
        ::after {
          position: absolute;
          top: -0px;
          content: "▼";
          color: rgb(48, 48, 48);
          font-size: 12px;
        }
      `};

    ::before {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -10px;
      height: 15px;
      background-color: rgb(48, 48, 48);
      color: white;
      font-size: 14px;
    }
  }
`;

const MenuBox = ({ dispatch }) => {
  const [hide, setHide] = useState(false);
  const weather = useSelector((state) => state.state.weather);
  const haetsal = useSelector((state) => state.user.myInfo.haetsal);
  const ip_amount = useSelector((state) => state.user.myInfo.ip_amount);
  const wData = weatherData;

  return (
    <MenuContainer className="cc" weather={weather} hide={hide}>
      <Menu
        text={"정보"}
        onClick={() => dispatch(handleTopMenu({ select: "Status" }))}
      >
        <FontAwesomeIcon icon="fa-solid fa-circle-user" />
      </Menu>
      <Menu
        text={"가방"}
        onClick={() => {
          dispatch(sellChange({ change: false }));
          dispatch(handleTopMenu({ select: "Inventory" }));
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-suitcase" />
      </Menu>
      <Menu
        text={"나의 NFT"}
        onClick={() => dispatch(handleTopMenu({ select: "NftList" }))}
      >
        <FontAwesomeIcon icon="fa-solid fa-cube" />
      </Menu>
      <Menu
        text={"NFT 생성"}
        onClick={() => dispatch(handleTopMenu({ select: "NftCreate" }))}
      >
        <FontAwesomeIcon icon="fa-solid fa-square-plus" />
      </Menu>
      <div className="weatherBox">
        <div className="weather">{wData[weather]}</div>
      </div>
      <Menu
        text={"채팅"}
        onClick={() => dispatch(handleTopMenu({ select: "Chatting" }))}
      >
        <FontAwesomeIcon icon="fa-regular fa-comment" />
      </Menu>
      <Menu text={"건물 건설"} onClick={() => alert("구현 중입니다..")}>
        <FontAwesomeIcon icon="fa-solid fa-hammer" />
      </Menu>
      <Menu
        text={"거래소"}
        onClick={() => dispatch(handleTopMenu({ select: "Exchange" }))}
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-right-arrow-left" />
      </Menu>
      <Menu
        text={"NFT거래소"}
        onClick={() => dispatch(handleTopMenu({ select: "NftExchange" }))}
      >
        <FontAwesomeIcon icon="fa-solid fa-table-cells-large" />
      </Menu>
      {/* <Menu text={"maps"}>
        <FontAwesomeIcon icon="fa-regular fa-map" />
      </Menu> */}
      <div className="streamlineBox cc" onClick={() => setHide(!hide)}>
        <div className="haetsal">{haetsal} 햇살</div>
        <div className="tokenAmount">{ip_amount} IP</div>
      </div>
    </MenuContainer>
  );
};

export default MenuBox;
