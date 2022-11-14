import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Loading from "./loading/Loading";

const ModalBox = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(209, 209, 209, 0.5);
  z-index: ${(props) => (props.check ? "10000" : "-50000")};
`;

const Modal = () => {
  // 컨트롤 코드 필요
  const { check } = useSelector((state) => state.modal);
  console.log(check);
  return (
    <ModalBox check={check}>
      {check === "loading" ? <Loading /> : null}
      {/* {check === "loading" ? <Loading /> : null} */}
    </ModalBox>
  );
};

export default Modal;
