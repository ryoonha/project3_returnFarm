import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleTopMenu } from "../../../stores/reducers/stateSlice";
import { useSelector } from "react-redux";
import { weatherData } from "../../../data/weather";

const MenuContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 70px;
  border-radius: 0px 0px 20% 20%;
  background-color: rgba(133, 133, 133, 0.4);
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
    //margin: 0px 15px 0px 15px;
    //background-color: rgba(134, 88, 74, 0.507);
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
  width: 50px;
  height: 50px;
  background-color: rgba(233, 255, 255, 1);
  border-radius: 10%;

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
      //width: 30px;
      height: 15px;
      background-color: rgb(48, 48, 48);
      color: white;
      font-size: 14px;
    }
  }
`;

const MenuBox = ({ dispatch }) => {
  const { weather } = useSelector((state) => state.state);
  const wData = weatherData;
  return (
    <MenuContainer className="cc" weather={weather}>
      <Menu
        text={"info"}
        onClick={() => dispatch(handleTopMenu({ select: "Status" }))}
      >
        <FontAwesomeIcon icon="fa-solid fa-circle-user" />
      </Menu>
      <Menu
        text={"inventory"}
        onClick={() => dispatch(handleTopMenu({ select: "Inventory" }))}
      >
        <FontAwesomeIcon icon="fa-solid fa-suitcase" />
      </Menu>
      <Menu>?</Menu>
      <div className="weatherBox">
        <div className="weather">{wData[weather]}</div>
      </div>
      <Menu
        text={"exchange"}
        onClick={() => dispatch(handleTopMenu({ select: "Exchange" }))}
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-right-arrow-left" />
      </Menu>
      <Menu
        text={"chatting"}
        onClick={() => dispatch(handleTopMenu({ select: "Chatting" }))}
      >
        <FontAwesomeIcon icon="fa-regular fa-comment" />
      </Menu>
      <Menu>?</Menu>
    </MenuContainer>
  );
};

export default MenuBox;
