import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { modalChange } from "../../../stores/reducers/stateSlice";

const ErrorBox = styled.div`
  position: absolute;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: rgba(248, 255, 240, 0.719);
  z-index: 10000;
  animation: opacity 1s infinite;
  .errorImg {
    animation: imgRotation 1s infinite linear;
    img {
      width: 150px;
      height: 150px;
    }
  }
  .errorText {
    margin-top: 10px;
    font-size: 26px;
  }

  @keyframes opacity {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes imgRotation {
    0% {
      transform: rotate(-25deg);
    }
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(25deg);
    }
  }
`;

const Error = ({ type }) => {
  const dispatch = useDispatch();
  const handleType = {
    haes_sal: { img: "day", path: "tokens", desc: "햇살이 부족해요!" },
    ip: { img: "leaf", path: "tokens", desc: "잎 토큰이 부족해요!" },
    sold: { img: "X", path: "icons", dsec: "없는 아이템 입니다!" },
  };

  useEffect(() => {
    const end = setTimeout(() => {
      dispatch(modalChange({ change: "" }));
    }, 1000);

    return () => clearTimeout(end);
  });

  return (
    <ErrorBox className="cc">
      <div className="errorImg cc">
        <img
          src={`images/${handleType[type].path}/${handleType[type].img}.png`}
          alt=""
        />
      </div>
      <div className="errorText">{`${handleType[type].desc}`}</div>
    </ErrorBox>
  );
};

export default Error;
