import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { handleSell } from "../../../stores/reducers/gameSlice";
import {
  handleItem,
  handleMouse,
  sellChange,
} from "../../../stores/reducers/stateSlice";

const RightBoxContainer = styled.div`
  position: absolute;
  justify-content: flex-start;
  background-color: #858585;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 100%;
  color: white;
  z-index: 2000;
  cursor: pointer;

  .leftLine {
    width: 10px;
    height: 100%;
    background-color: var(--headerBack);
  }

  .option {
    width: 100%;
    transition: 0.2s;
    div {
      :hover {
        background-color: rgb(65, 65, 65);
      }
    }
  }
`;

const RightBox = ({ item, index, dispatch }) => {
  const rightClick = useSelector((state) => state.state.rightClick);
  if (rightClick[0] === `right${index}`) {
    return (
      <RightBoxContainer
        className="cc"
        onMouseEnter={() => {
          dispatch(handleItem({ itemNum: null }));
        }}
        onMouseLeave={() => {
          dispatch(handleMouse({ on: [false, false, false] }));
        }}
      >
        <div className="leftLine" />
        <div className="option">
          <div
            onClick={() => {
              dispatch(sellChange({ change: true }));
              dispatch(handleSell({ itemInfo: item }));
              dispatch(handleMouse({ on: [false, false, false] }));
            }}
          >
            거래소 등록
          </div>
          <div>버리기</div>
        </div>
      </RightBoxContainer>
    );
  }
};

export default RightBox;
