import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox } from "../../../libs/cssFrame";
import { itemList } from "../../../data/item";
import { useDispatch, useSelector } from "react-redux";
import ItemStatus from "../../modals/statusBox/ItemStatus";
import { handleItem, handleMouse } from "../../../stores/reducers/stateSlice";
import { handleSell } from "../../../stores/reducers/gameSlice";
import ItemSell from "../exchange/ItemSell";
import RightBox from "../../modals/rightBox/RightBox";

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

const Inventory = ({ select }) => {
  const [x, y, bindDivPos] = useDivMove();
  const dispatch = useDispatch();
  const { bag } = useSelector((state) => state.user);
  const sellToggle = useSelector((state) => state.state.sellToggle);
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
        <div
          className="boxBody cc"
          onMouseEnter={() => {
            dispatch(handleItem({ itemNum: null }));
          }}
        >
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
                dispatch(handleMouse({ on: [false, false, false] }));
              }}
              onContextMenu={(e) => {
                dispatch(
                  handleMouse({ on: [`right${index}`, e.clientX, e.clientY] })
                );
              }}
              onClick={() => {
                if (sellToggle) {
                  dispatch(handleSell({ itemInfo: item }));
                }
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
              <RightBox item={item} index={index} dispatch={dispatch} />
            </div>
          ))}
        </div>
        {sellToggle && select ? <ItemSell dispatch={dispatch} /> : null}
      </InventoryBox>
    </animated.div>
  );
};

export default Inventory;
