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
  margin-bottom: 1px;
  background-color: #cfcfcf;
  cursor: pointer;

  :hover {
    background-color: #cebaba;
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
  .exchangeItemInfoBox {
    justify-content: space-between;
    width: 600px;
    margin-left: 10px;
    .exchangeItemName {
      color: var(--itemName);
      /* background-color: #0a0a0a; */
    }
    .exchangeItemCount {
      color: ${(props) => (props.countColor ? props.countColor : "black")};
    }
    .leafCountBox {
      .leafImg {
        img {
          width: 25px;
          height: 25px;
          object-fit: cover;
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
  const { item_name, item_count, selling_price, address, created_at } = data;
  // 여기서 시작
  return (
    <ItemBoxContainer countColor={unitColor[item_count.length]}>
      <div className="exchangeItemIconBox cc">
        <img src={itemList[item_name].img} alt="" />
      </div>
      <div className="exchangeItemInfoBox cc">
        <div>
          <div className="exchangeItemName">{item_name}</div>
          <div className="exchangeItemCount">{item_count}개</div>
        </div>
        <div>
          <div className="leafCountBox cc">
            <div className="leafCount">{selling_price} 20</div>
            <div className="leafImg">
              <img src="/images/tokens/leaf.png" alt="" />
            </div>
          </div>
          <div className="exchangeItemTimeData">{created_at} 2011/11/11</div>
        </div>
      </div>
    </ItemBoxContainer>
  );
};

export default ItemBox;
