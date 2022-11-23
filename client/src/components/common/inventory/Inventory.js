import React, { useState } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox, DetailBox } from "../../../libs/cssFrame";
import { itemList } from "../../../data/item";
import { useDispatch, useSelector } from "react-redux";
import { dateName } from "../../../data/weather";
import ItemStatus from "../../modals/statusBox/ItemStatus";
import { handleItem } from "../../../stores/reducers/stateSlice";

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
        background-color: rgba(0, 0, 0, 0.473);
        color: white;
      }
    }
  }
`;

const Inventory = () => {
  const [x, y, bindDivPos] = useDivMove();
  const dispatch = useDispatch();
  const { bag } = useSelector((state) => state.user);
  const itemData = itemList;

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
          {bag.map((item, index) => (
            <div
              className="itemBox cc"
              key={index}
              style={item ? { border: "1px solid rgb(173, 173, 173)" } : null}
              onMouseEnter={() => {
                dispatch(handleItem({ itemNum: `item${index}` }));
              }}
              onMouseLeave={() => {
                dispatch(handleItem({ itemNum: `item${index}` }));
              }}
              onContextMenu={() => {
                alert("채팅방을 정말 삭제하시겠어요?");
              }}
            >
              <img src={itemData[item.item_name].img} alt="" />
              <div className="itemName cc">{item.item_name}</div>
              <ItemStatus
                item={item}
                index={index}
                itemData={itemData}
                dispatch={dispatch}
                handleItem={handleItem}
              />
            </div>
          ))}
        </div>
      </InventoryBox>
    </animated.div>
  );
};

export default Inventory;
