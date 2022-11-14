import React from "react";
import styled from "styled-components";

const LoadingBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background-color: rgba(240, 248, 255, 0.8);
  border-radius: 50%;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

const Loading = () => {
  const startSrc = "/gif/loading/";
  const gifArr = [
    startSrc + "seed.gif",
    startSrc + "tree.gif",
    startSrc + "egg.gif",
  ];

  return (
    <LoadingBox className="cc">
      <img src={gifArr[Math.floor(Math.random() * 3)]} alt="" />
    </LoadingBox>
  );
};

export default Loading;
