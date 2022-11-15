import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const HotkeyContainer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100vw;
  height: 90px;
  background-color: var(--mainColor);

  .hotkeyroll {
    display: flex;
    flex-direction: column;
    position: relative;
    left: -10px;
    background-color: #8699bd;
    border-radius: 20px;
    font-size: 28px;
    .up,
    .down {
      transition: 0.2s;
      cursor: pointer;
      :hover {
        color: aliceblue;
      }
    }
  }
`;

const Box = styled.div`
  width: 60px;
  height: 60px;
  background-color: antiquewhite;
  margin: 0px 10px 0px 10px;
`;

const HotkeyBox = () => {
  let arr = Array(9).fill(false);

  return (
    <HotkeyContainer className="cc">
      <div className="hotkeyroll">
        <div className="up">
          <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
        </div>
        <div className="down">
          <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
        </div>
      </div>
      {arr.map((item, index) => (
        <Box className="cc" key={index} style={{ cursor: "pointer" }}>
          {index}
        </Box>
      ))}
    </HotkeyContainer>
  );
};

export default HotkeyBox;
