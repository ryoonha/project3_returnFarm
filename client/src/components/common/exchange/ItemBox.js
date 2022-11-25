import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { unitColor } from "../../../data/etc";
import { itemList } from "../../../data/item";

const ItemBoxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  /* margin-bottom: 1px; */
  outline: 1px solid black;
  background-color: var(--back);
  color: white;
  cursor: pointer;

  :hover {
    background-color: rgba(173, 173, 173, 0.493);
  }

  .exchangeItemIconBox {
    width: 50px;
    height: 50px;
    outline: 1px solid black;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .itemInfoBox {
    justify-content: space-between;
    width: 600px;
    margin-left: 10px;
    .info1 {
      .exchangeItemName {
        color: var(--itemName);
        /* background-color: #0a0a0a; */
      }
      .exchangeItemCount {
        color: ${(props) => (props.countColor ? props.countColor : "white")};
      }
    }
    .info2 {
      justify-content: space-between;
      width: 200px;
      /* background-color: #f0f8ff96; */
      .itemTimeData {
        text-align: center;
        .timeDataText {
          font-size: 12px;
        }
      }
      .leafCountBox {
        .leafImg {
          margin-left: 5px;
          img {
            width: 25px;
            height: 25px;
            object-fit: cover;
          }
        }
      }
    }
  }
  animation: itemOpen 0.5s forwards;

  @keyframes itemOpen {
    0% {
      height: 0px;
    }
    100% {
      height: 50px;
    }
  } ;
`;

const ItemBox = ({ data }) => {
  const { item_name, item_count, selling_price, address, createdAt } = data;
  // 여기서 시작
  return (
    <ItemBoxContainer countColor={unitColor[item_count.length]}>
      <div className="exchangeItemIconBox cc">
        <img src={itemList[item_name].img} alt="" />
      </div>
      <div className="itemInfoBox cc">
        <div className="info1">
          <div className="exchangeItemName">{item_name}</div>
          <div className="exchangeItemCount">{item_count}개</div>
        </div>
        <div className="info2 cc">
          <div className="itemTimeData">
            <div className="timeDataText">등록 날짜</div>
            <div>{createdAt.split("T")[0]}</div>
          </div>
          <div className="leafCountBox cc">
            <div className="leafCount">{selling_price}</div>
            <div className="leafImg cc">
              <img src="/images/tokens/day.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </ItemBoxContainer>
  );
};

export default ItemBox;
