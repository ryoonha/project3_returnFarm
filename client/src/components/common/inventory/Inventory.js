import React, { useState } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox, DetailBox } from "../../../libs/cssFrame";
import { itemList } from "../../../data/item";
import { useSelector } from "react-redux";
import { dateName } from "../../../data/weather";

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
  const [hover, setHover] = useState();
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
              onMouseEnter={(e) => {
                setHover(`item${index}`);
              }}
              onMouseLeave={(e) => {
                if (hover) {
                  setHover(false);
                }
              }}
              onContextMenu={(e) => {
                alert("채팅방을 정말 삭제하시겠어요?");
              }}
            >
              <img src={itemData[item.item_name].img} alt="" />
              <div className="itemName cc">{item.item_name}</div>
              {hover === `item${index}` ? (
                <DetailBox
                  onMouseOver={(e) => {
                    setHover(false);
                  }}
                >
                  <div className="item cc">{item.item_name}</div>
                  <div className="desc">{itemData[item.item_name].desc}</div>
                  <div className="countBox">
                    <div className="title">개수</div>
                    <div>{item.item_count} 개</div>
                  </div>
                  <div className="timeBox">
                    <div className="title">획득시간</div>
                    <div>
                      {item.time.split("/").map((data, index) => (
                        <span
                          key={index}
                          className={`time${index}`}
                        >{`${data}${dateName[index]} `}</span>
                      ))}
                    </div>
                  </div>
                </DetailBox>
              ) : null}
            </div>
          ))}
        </div>
      </InventoryBox>
    </animated.div>
  );
};

export default Inventory;
