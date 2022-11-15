import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextBox } from "../../../libs/cssFrame";
import { opneControl } from "../../../stores/reducers/stateSlice";

const MenuContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 80px;
  border-radius: 0px 0px 50% 50%;
  background-color: var(--mainColor);
  overflow: hidden;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 10px 0px 10px;
    transform: translateX(-0px);
    font-size: 24px;
    transition: 0.2s;
  }

  .weatherBox {
    width: 90px;
    height: 90px;
    margin: 0px 15px 0px 15px;
    background-color: rgb(130, 197, 255);
    border-radius: 50%;

    .weather {
      width: 50px;
      height: 50px;
      background-color: rgb(255, 255, 255);
      border-radius: 50%;
      color: #ff4931;
      animation: rotation 5s infinite linear forwards;

      :hover {
        font-size: 30px;
      }
    }
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Menu = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(233, 255, 255, 1);
  border-radius: 10%;

  :hover {
    background-color: rgb(255, 240, 212);
    font-size: 30px;
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
      //width: 30px;
      height: 15px;
      background-color: rgb(48, 48, 48);
      color: white;
      font-size: 14px;
    }
  }
`;

const MenuBox = ({ dispatch }) => {
  return (
    <MenuContainer className="cc">
      <Menu
        text={"info"}
        onClick={() => dispatch(opneControl({ select: "Status" }))}
      >
        <FontAwesomeIcon icon="fa-solid fa-circle-user" />
      </Menu>
      <Menu
        text={"inventory"}
        onClick={() => dispatch(opneControl({ select: "Inventory" }))}
      >
        <FontAwesomeIcon icon="fa-solid fa-suitcase" />
      </Menu>
      <Menu>?</Menu>
      <div className="weatherBox">
        <div className="weather">
          <FontAwesomeIcon icon="fa-solid fa-sun" />
        </div>
      </div>
      <Menu
        text={"exchange"}
        onClick={() => dispatch(opneControl({ select: "Exchange" }))}
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-right-arrow-left" />
      </Menu>
      <Menu
        text={"chatting"}
        onClick={() => dispatch(opneControl({ select: "Chatting" }))}
      >
        <FontAwesomeIcon icon="fa-regular fa-comment" />
      </Menu>
      <Menu>?</Menu>
    </MenuContainer>
  );
};

export default MenuBox;
