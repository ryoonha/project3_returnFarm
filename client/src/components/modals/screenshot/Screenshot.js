import React, { useRef } from "react";
import styled from "styled-components";

const ScreenshotBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 70vh;
  /* background-color: rgb(255, 197, 197); */
  .canvasBox {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 80vw;
    height: 70vh;
    canvas {
      width: 100%;
      height: 100%;
    }
  }
  .testButton {
    position: absolute;
    top: -100px;
    width: 100px;
    height: 50px;
    background-color: #a2ff6c;
  }

  .topBor,
  .bottomBor {
    display: flex;
    justify-content: space-between;
    width: 100%;
    /* background-color: rgb(224, 242, 255); */

    .bor {
      width: 150px;
      height: 150px;
      /* background-color: rgb(200, 255, 203); */
    }
    .leftOrBottom,
    .bottomOrRight {
      margin-top: auto;
    }
    .leftOrTop {
      border-left: 2px solid black;
      border-top: 2px solid black;
      border-radius: 20px 0px 0px 0px;
    }
    .topOrRight {
      border-top: 2px solid black;
      border-right: 2px solid black;
      border-radius: 0px 20px 0px 0px;
    }
    .leftOrBottom {
      border-left: 2px solid black;
      border-bottom: 2px solid black;
      border-radius: 0px 0px 0px 20px;
    }
    .bottomOrRight {
      border-bottom: 2px solid black;
      border-right: 2px solid black;
      border-radius: 0px 0px 20px 0px;
    }
  }
`;

const Screenshot = () => {
  return (
    <ScreenshotBox>
      <div className="topBor">
        <div className="leftOrTop bor" />
        <div className="topOrRight bor" />
      </div>
      <div className="bottomBor">
        <div className="leftOrBottom bor" />
        <div className="bottomOrRight bor" />
      </div>
    </ScreenshotBox>
  );
};

export default Screenshot;
