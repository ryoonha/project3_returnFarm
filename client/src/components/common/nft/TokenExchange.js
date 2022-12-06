import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animated } from "react-spring";
import styled from "styled-components";
import { nftExchange, nftIpExchange } from "../../../api/nft";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox } from "../../../libs/cssFrame";
import { modalChange } from "../../../stores/reducers/stateSlice";

const TokenExchangeBox = styled(BasicBox)`
  display: flex;
  flex-direction: column;
  left: 50vw;
  transform: translateX(-50%);
  width: 700px;
  height: 600px;
  background-color: var(--back);

  img {
    width: 100px;
    height: 100px;
  }
  .tBox {
    width: 100%;
    height: 100%;
    flex-direction: column;
    .ex {
      width: 100%;
      color: ${(props) =>
        props.tChange ? "rgb(171, 255, 160)" : "rgb(255, 133, 133)"};
      font-size: 100px;
      img {
        margin: auto;
      }
    }
    .inputBox {
      flex-direction: column;
      text-align: center;
      .change {
        width: 100px;
        height: 50px;
        border: 1px solid rgb(27, 27, 27);
        margin: 15px 0px;
        color: var(--title);
        background-color: rgb(58, 58, 58);
        cursor: pointer;
        :hover {
          background-color: rgb(102, 102, 102);
        }
      }
      .eText {
        font-size: 24px;
        color: ${(props) =>
          props.tChange ? "rgb(171, 255, 160)" : "rgb(255, 133, 133)"};
      }
      input {
        width: 150px;
        height: 30px;
        border: 0px;
        margin-top: 1px;
        padding-left: 15px;
        text-align: center;
        background-color: rgb(61, 61, 61);
        color: white;
        :focus {
          outline: 1px solid rgb(158, 158, 158);
        }
      }
      .t {
        margin-top: 30px;
        color: white;
      }
    }
  }
`;

const TokenExchange = () => {
  const dispatch = useDispatch();
  const [x, y, bindDivPos] = useDivMove();
  const { address } = useSelector((state) => state.user.myInfo);
  const [exchangeValue, setExchangeValue] = useState({
    haetsal_amount: 0,
    ip_amount: 0,
  });
  const [tChange, setTChange] = useState(false);

  const handleExchange = async () => {
    dispatch(modalChange({ change: "loading" }));
    const obj = {
      address,
      amount: exchangeValue.haetsal_amount,
    };
    const { status } = await nftExchange(obj);
    if (status) {
      alert("교환 성공!");
    } else {
      alert("교환에 실패 했습니다!");
    }
    dispatch(modalChange({ change: "" }));
  };
  const handleIpExchange = async () => {
    dispatch(modalChange({ change: "loading" }));
    const obj = {
      address,
      amount: exchangeValue.ip_amount,
    };
    const { status } = await nftIpExchange(obj);
    if (status) {
      alert("교환 성공!");
    } else {
      alert("교환에 실패 했습니다!");
    }
    dispatch(modalChange({ change: "" }));
  };

  return (
    <animated.div
      style={{
        x,
        y,
      }}
    >
      <TokenExchangeBox tChange={tChange}>
        <div className="header" {...bindDivPos()}>
          토큰 교환소
        </div>
        <div className="tBox cc">
          <div className="ex cc">
            <img src="/images/tokens/day.png" alt="" />
            <div className="icon">
              {tChange ? (
                <FontAwesomeIcon icon="fa-solid fa-arrow-right-long" />
              ) : (
                <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" />
              )}
            </div>

            <img src="/images/tokens/leaf.png" alt="" />
          </div>
          <div className="inputBox cc">
            <div
              className="change cc"
              onClick={() => {
                setExchangeValue({ haetsal_amount: 0, ip_amount: 0 });
                setTChange(!tChange);
              }}
            >
              변경
            </div>
            <div className="eText">
              {tChange ? "잎으로 변경" : "햇살로 변경"}
            </div>
            <input
              type="number"
              min="1"
              max="10000"
              step="1"
              placeholder={tChange ? "교환할 햇살 수량" : "교환할 잎 수량"}
              onChange={(e) => {
                if (tChange) {
                  setExchangeValue({
                    ...exchangeValue,
                    haetsal_amount: e.target.value,
                  });
                } else {
                  setExchangeValue({
                    ...exchangeValue,
                    ip_amount: e.target.value,
                  });
                }
              }}
            />
            <div
              className="change t cc"
              onClick={() => {
                if (tChange) {
                  handleExchange();
                } else {
                  handleIpExchange();
                }
              }}
            >
              교환하기
            </div>
          </div>
        </div>
      </TokenExchangeBox>
    </animated.div>
  );
};

export default TokenExchange;
