import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LandStatus from "./statusBox/LandStatus";
import Loading from "./loading/Loading";
import Screenshot from "./screenshot/Screenshot";
import Error from "./error/Error";

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
  const modalCheck = useSelector((state) => state.state.modalCheck);
  const tileSelect = useSelector((state) => state.state.tileSelect);
  return (
    <ModalBox check={modalCheck}>
      {modalCheck === "loading" ? <Loading /> : null}
      {modalCheck.split("/")[0] === "error" ? (
        <Error type={modalCheck.split("/")[1]} />
      ) : null}
      {modalCheck === "screenshot" ? <Screenshot /> : null}
      {tileSelect.x !== null && tileSelect.z !== null ? (
        <LandStatus tileData={tileSelect} />
      ) : null}
    </ModalBox>
  );
};

export default Modal;
