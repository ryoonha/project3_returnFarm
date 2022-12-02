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
  top: ${(props) => (props.nft ? "50px" : "50%")};
  left: ${(props) => (props.nft ? "50px" : "50%")};
  width: 150px;
  height: ${(props) => (props.nft ? "50px" : "100%")};
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

const RightBox = ({ item, nft, index, dispatch, handleTransfer }) => {
  const rightClick = useSelector((state) => state.state.rightClick);
  if (rightClick[0] === `right${index}`) {
    return (
      <RightBoxContainer
        nft={nft}
        className="cc"
        onMouseEnter={() => {
          if (item) {
            dispatch(handleItem({ itemNum: null }));
          } else if (nft) {
          }
        }}
        onMouseLeave={() => {
          dispatch(handleMouse({ on: [false, false, false] }));
        }}
      >
        <div className="leftLine" />
        <div className="option">
          <div
            onClick={() => {
              if (item) {
                dispatch(sellChange({ change: true }));
                dispatch(handleSell({ itemInfo: item }));
                dispatch(handleMouse({ on: [false, false, false] }));
              } else if (nft) {
                handleTransfer();
              }
            }}
          >
            {item ? "거래소 등록" : null}
            {nft ? "선물하기" : null}
          </div>
          <div>버리기</div>
        </div>
      </RightBoxContainer>
    );
  }
};

export default RightBox;
