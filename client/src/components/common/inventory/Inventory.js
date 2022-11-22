import React, { useState } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox } from "../../../libs/cssFrame";
import { itemList } from "../../../data/item";
import { useSelector } from "react-redux";

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
  .detailBox {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50px;
    width: 210px;
    //height: 150px;
    background-color: rgba(36, 36, 36, 0.479);
    div {
      text-align: center;
      color: white;
    }
    .item {
      color: rgb(116, 194, 194);
      background-color: rgb(41, 41, 41);
    }
    .desc,
    .countBox,
    .timeBox {
      padding: 5px 0px 5px 0px;
      .time0 {
        color: orange;
      }
      .time1 {
        color: #f8ff94;
      }
      .time2 {
        color: #b9ff8a;
      }
      .time3 {
        color: #c0bcff;
      }
      .time4 {
        color: #f290ff;
      }
    }
    .countBox {
      border-top: 1px solid rgb(110, 110, 110);
      border-bottom: 1px solid rgb(110, 110, 110);
    }
    .title {
      color: rgb(164, 214, 255);
    }
  }
`;

const Inventory = () => {
  const [x, y, bindDivPos] = useDivMove();
  const [hover, setHover] = useState();
  const { bag } = useSelector((state) => state.user);
  const itemData = itemList;

  const dateName = {
    0: "년",
    1: "월",
    2: "일",
    3: "시",
    4: "분",
  };

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
                <div
                  className="detailBox"
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
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </InventoryBox>
    </animated.div>
  );
};

export default Inventory;
