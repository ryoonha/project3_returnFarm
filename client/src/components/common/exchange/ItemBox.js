import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const ItemBoxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  background-color: #cfcfcf;
  cursor: pointer;

  :hover {
    background-color: #cebaba;
  }

  .exchangeItemIconBox {
    width: 50px;
    height: 50px;
    border: 1px solid black;
  }
  .exchangeItemInfoBox {
    justify-content: space-between;
    width: 600px;
    margin-left: 10px;
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

const ItemBox = () => {
  return (
    <ItemBoxContainer>
      <div className="exchangeItemIconBox cc">
        <FontAwesomeIcon icon="fa-solid fa-carrot" />
      </div>
      <div className="exchangeItemInfoBox cc">
        <div>
          <div className="exchangeItemName">당근</div>
          <div className="exchangeItemCount cc">8개</div>
        </div>
        <div>
          <div className="exchangeItemCoin">필요한 토큰 : 3 coin</div>
          <div className="exchangeItemTimeData">등록 날짜 : 2022-11-12</div>
        </div>
      </div>
    </ItemBoxContainer>
  );
};

export default ItemBox;
