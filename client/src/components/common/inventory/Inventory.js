import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox } from "../../../libs/cssFrame";

const InventoryBox = styled(BasicBox)`
  /* background-color: #f7a9ec; */
  transform: translateX(48vw);
  height: auto;

  .boxBody {
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: #fdffe3;

    .itemBox {
      width: 50px;
      height: 50px;
      :hover {
        background-color: #ffba39;
        //background-color: rgb(212, 212, 212);
      }
    }
  }
`;

const Inventory = () => {
  const [x, y, bindDivPos] = useDivMove();

  // db에서 인벤토리 데이터 받아오기
  let arr = Array(30).fill(<FontAwesomeIcon icon="fa-solid fa-carrot" />);
  return (
    <animated.div
      style={{
        x,
        y,
      }}
    >
      <InventoryBox>
        <div className="header" {...bindDivPos()}>
          Inventory
        </div>
        <div className="boxBody cc">
          {arr.map((item, index) => (
            <div
              className="itemBox cc"
              key={index}
              style={item ? { border: "1px solid rgb(173, 173, 173)" } : null}
            >
              {item}
            </div>
          ))}
        </div>
      </InventoryBox>
    </animated.div>
  );
};

export default Inventory;
