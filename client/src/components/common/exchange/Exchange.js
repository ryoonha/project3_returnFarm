import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox } from "../../../libs/cssFrame";
import ItemBox from "./ItemBox";
import { useDispatch, useSelector } from "react-redux";
import { handleTopMenu, sellChange } from "../../../stores/reducers/stateSlice";

const ExchangeBox = styled(BasicBox)`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
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

  .listBox {
    height: 100%;
    background-color: rgba(77, 77, 77, 0.5);
    overflow: auto;
  }
  .addBox {
    width: 100%;
    height: 70px;
    border-radius: 0px 0px 11px 11px;
    background-color: rgba(241, 241, 241, 0.788);
    transition: 0.3s;
    .buttonBox {
      font-size: 24px;
    }
    :hover {
      background-color: rgb(160, 177, 255);
    }
  }

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
  const dispatch = useDispatch();
  const [x, y, bindDivPos] = useDivMove();
  const [open, setOpen] = useState(false);
  const list = useSelector((state) => state.game.marketList);
  const ipToken = useSelector((state) => state.user.myInfo.ip_amount);
  const itemData = useSelector((state) => state.game.sellData);

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
        <div className="listBox">
          {list.map((item, index) => (
            <ItemBox key={index} data={item} />
          ))}
        </div>
        <div
          className="addBox cc"
          onClick={() => {
            dispatch(sellChange({ change: true }));
            dispatch(handleTopMenu({ select: "Inventory" }));
          }}
        >
          <div className="buttonBox cc">등록하기</div>
        </div>
      </ExchangeBox>
    </animated.div>
  );
};

export default Exchange;
