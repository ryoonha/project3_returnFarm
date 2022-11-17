import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Loading from "./loading/Loading";
import Screenshot from "./screenshot/Screenshot";

const ModalBox = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(209, 209, 209, 0.5);
  z-index: ${(props) => (props.check ? "10000" : "-50000")};
  button {
    width: 500px;
    height: 500px;
    background-color: aliceblue;
  }
`;

const Modal = () => {
  // 컨트롤 코드 필요
  const { check } = useSelector((state) => state.modal);

  return (
    <ModalBox check={check}>
      {check === "loading" ? <Loading /> : null}
      {check === "screenshot" ? <Screenshot /> : null}
    </ModalBox>
  );
};

export default Modal;
