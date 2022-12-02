import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { itemList } from "../../../data/item";
import { handleItem, handleScroll } from "../../../stores/reducers/gameSlice";

const HotkeyContainer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100vw;
  height: 90px;
  background-color: rgba(133, 133, 133, 0.4);

  .hotkeyroll {
    display: flex;
    flex-direction: column;
    position: relative;
    left: -10px;
    background-color: rgba(250, 250, 250, 0.4);
    border-radius: 20px;
    font-size: 28px;
    .up,
    .down {
      transition: 0.2s;
      cursor: pointer;
      :hover {
        color: aliceblue;
      }
    }
    .hotNum {
      font-size: 16px;
    }
  }
`;

const Box = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  background-color: antiquewhite;
  margin: 0px 10px 0px 10px;
  :hover {
    background-color: rgb(212, 199, 182);
  }
  .num {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 15px;
    height: 15px;
    color: white;
    background-color: rgba(27, 27, 27, 0.733);
    font-size: 12px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HotkeyBox = () => {
  const dispatch = useDispatch();
  const bag = useSelector((state) => state.user.bag);
  const select = useSelector((state) => state.game.selectItem);
  const scroll = useSelector((state) => state.game.selectScroll);
  let arr = Array(9).fill(false);

  return (
    <HotkeyContainer className="cc">
      <div className="hotkeyroll">
        <div
          className="up cc"
          onClick={() => {
            if (scroll < 18) {
              dispatch(handleScroll({ num: scroll + 9 }));
            } else {
              dispatch(handleScroll({ num: 0 }));
            }
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
        </div>
        <div className="hotNum cc">{scroll / 9 + 1}</div>
        <div
          className="down cc"
          onClick={() => {
            if (scroll > 0) {
              dispatch(handleScroll({ num: scroll - 9 }));
            } else {
              dispatch(handleScroll({ num: 18 }));
            }
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
        </div>
      </div>
      {arr.map((item, index) => (
        <Box
          className="cc"
          key={index}
          style={{
            cursor: "pointer",
            outline: select[0] === index ? "2px solid black" : "0px",
          }}
          onClick={() => {
            if (bag[index + scroll]) {
              dispatch(handleItem({ item: [index, bag[index].item_name] }));
            }
          }}
        >
          {bag[index + scroll] ? (
            <div>
              <div className="num cc">{index + 1}</div>
              <img src={`${itemList[bag[index].item_name].img}`} alt="" />
            </div>
          ) : (
            <div>
              <div className="num cc">{index + 1}</div>
            </div>
          )}
        </Box>
      ))}
    </HotkeyContainer>
  );
};

export default HotkeyBox;
