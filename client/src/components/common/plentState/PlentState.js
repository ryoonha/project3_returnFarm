import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StateBox = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 200px;
  height: 270px;
  background-color: rgba(139, 201, 255, 0.8);
  z-index: 100;

  .state {
  }

  .itemBox {
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;

    .item,
    .itemCheck {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
      width: 50px;
      height: 50px;
      background-color: #edffc3;
      transition: 0.2s;

      :hover {
        background-color: #7eff8f;
      }
    }
    .itemCheck {
      background-color: #ff8d7e;
      :hover {
        background-color: #ff8d7e;
      }
    }
  }

  .select {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;

    button {
      width: 85px;
      height: 50px;
      border: 0px;
    }
    .harvesting {
      background-color: #ffca57;
    }
    .delete {
      background-color: #ff3e3e;
    }
  }
`;

const PlentState = () => {
  const dispatch = useDispatch();
  const arr = [
    <FontAwesomeIcon icon="fa-solid fa-seedling" />,
    <FontAwesomeIcon icon="fa-solid fa-droplet" />,
  ];
  const [check, setCheck] = useState({
    0: "item",
    1: "item",
  });
  const { tileSelect, pos, oPos } = useSelector((state) => state.state);
  const [x, y] = pos;
  //console.log(dispatch(planting()));
  if (true) {
    return (
      <StateBox check={check}>
        <div className="state">
          <div>임시로 만든 창</div>
          {/* <div>
            좌표 : x{pos[0]} y{pos[1]}
          </div> */}
          {/* <div>상태 : 비어있음</div>
          <div>시간 : 몰라</div>
          <div>수분 : 몰라요</div>
          <div>등등..</div> */}
        </div>
        <div className="select">
          <button
            className="harvesting"
            onClick={() => {
              // dispatch(grow());
            }}
          >
            테스트 급성장
          </button>
          {/* <button className="delete">제거</button> */}
        </div>
        <div className="itemBox">
          {arr.map((data, index) => (
            <div
              className={check[index]}
              key={index}
              onClick={() => {
                if (check[index] === "item") {
                  setCheck({ ...check, [index]: "itemCheck" });
                } else {
                  setCheck({ ...check, [index]: "item" });
                }
              }}
            >
              {data}
            </div>
          ))}
        </div>
        <div className="select">
          <button className="harvesting" onClick={() => alert("컨트랙트 실행")}>
            거래
          </button>
        </div>
      </StateBox>
    );
  }
};

export default PlentState;
