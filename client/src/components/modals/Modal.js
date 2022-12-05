import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LandStatus from "./statusBox/LandStatus";
import Loading from "./loading/Loading";
import Screenshot from "./screenshot/Screenshot";
import Error from "./error/Error";
import { soundData } from "../../data/sounds/sound";

const ModalBox = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(209, 209, 209, 0.5);
  z-index: ${(props) => (props.check ? "90000000000" : "-50000")};
  button {
    width: 500px;
    height: 500px;
    background-color: aliceblue;
  }
`;

const Modal = () => {
  const modalCheck = useSelector((state) => state.state.modalCheck);
  const tileSelect = useSelector((state) => state.state.tileSelect);
  const backSound = useSelector((state) => state.game.backgroundSound);

  const audio = new Audio(soundData.background);
  audio.volume = 0.5;
  audio.loop = true;
  // audio.addEventListener(
  //   "ended",
  //   function () {
  //     this.currentTime = 0;
  //     this.play();
  //   },
  //   false
  // );

  useEffect(() => {
    backSound ? audio.play() : audio.pause();
  }, [backSound]);

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
