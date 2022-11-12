import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox } from "../../../libs/cssFrame";
import ItemBox from "./ItemBox";

const ExchangeBox = styled(BasicBox)`
  left: 50vw;
  transform: translateX(-50%);
  width: 700px;
  height: 600px;
  ${(props) =>
    props.open
      ? css`
          animation: boxOpen 0.5s forwards;
        `
      : null}

  @keyframes boxOpen {
    0% {
      height: 0px;
    }
    100% {
      height: 600px;
    }
  } ;
`;

const Exchange = () => {
  const [x, y, bindDivPos] = useDivMove();
  const [open, setOpen] = useState(false);

  let arr = Array(5).fill(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <animated.div
      style={{
        x,
        y,
      }}
    >
      <ExchangeBox open={open}>
        <div className="header" {...bindDivPos()}>
          Exchange
        </div>
        {arr.map((item, index) => (
          <ItemBox key={index} />
        ))}
      </ExchangeBox>
    </animated.div>
  );
};

export default Exchange;
