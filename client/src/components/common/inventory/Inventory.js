import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox } from "../../../libs/cssFrame";
import { itemList } from "../../../data/item";

const InventoryBox = styled(BasicBox)`
  transform: translateX(48vw);
  height: auto;

  .boxBody {
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: #fdffe3;

    .itemBox {
      position: relative;
      width: 50px;
      height: 50px;
      :hover {
        background-color: #ffba39;
      }
      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
      .itemName {
        position: absolute;
        bottom: 0px;
        width: 100%;
        font-size: 10px;
        //border-radius: 5px 5px 0px 0px;
        background-color: rgba(0, 0, 0, 0.473);
        color: white;
      }
    }
  }
`;

const Inventory = () => {
  const [x, y, bindDivPos] = useDivMove();
  const itemData = itemList;
  // db에서 인벤토리 데이터 받아오기
  // let arr = Array(30).fill(<FontAwesomeIcon icon="fa-solid fa-carrot" />);
  let arr = [
    { item_name: "삽" },
    { item_name: "물뿌리개" },
    { item_name: "사과" },
    { item_name: "해바라기" },
    { item_name: "옥수수" },
    { item_name: "옥수수씨앗" },
    { item_name: "벼" },
  ];
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
            // <div
            //   className="itemBox cc"
            //   key={index}
            //   style={item ? { border: "1px solid rgb(173, 173, 173)" } : null}
            // >
            //   {item}
            // </div>
            <div
              className="itemBox cc"
              key={index}
              style={item ? { border: "1px solid rgb(173, 173, 173)" } : null}
            >
              <img src={itemData[item.item_name].img} alt="" />
              <div className="itemName cc">{item.item_name}</div>
            </div>
          ))}
        </div>
      </InventoryBox>
    </animated.div>
  );
};

export default Inventory;
