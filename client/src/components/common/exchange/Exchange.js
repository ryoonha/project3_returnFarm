import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { animated } from "react-spring";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox } from "../../../libs/cssFrame";
import ItemBox from "./ItemBox";
import { useDispatch, useSelector } from "react-redux";
import {
  handleTopMenu,
  modalChange,
  sellChange,
} from "../../../stores/reducers/stateSlice";
import { transactionBuy } from "../../../api/transaction";
import { bagUpdate, myInfoSave } from "../../../stores/reducers/userSlice";
import { handleMarketList } from "../../../stores/reducers/gameSlice";

const ExchangeBox = styled(BasicBox)`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  left: 50vw;
  transform: translateX(-50%);
  width: 700px;
  height: 600px;
  ${(props) =>
    props.open
      ? css`
          animation: boxOpen 0.5s forwards;
        `
      : null}

  .listBox {
    height: 100%;
    background-color: rgba(77, 77, 77, 0.5);
    overflow: auto;
  }
  .addBox {
    width: 100%;
    height: 70px;
    border-radius: 0px 0px 11px 11px;
    background-color: rgba(241, 241, 241, 0.788);
    transition: 0.3s;
    .buttonBox {
      font-size: 24px;
    }
    :hover {
      background-color: rgb(160, 177, 255);
    }
  }

  @keyframes boxOpen {
    0% {
      height: 0px;
    }
    100% {
      height: 600px;
    }
  } ;
`;

const Exchange = () => {
  const dispatch = useDispatch();
  const [x, y, bindDivPos] = useDivMove();
  const [open, setOpen] = useState(false);
  const list = useSelector((state) => state.game.marketList);
  const { nickName, address, ip_amount } = useSelector(
    (state) => state.user.myInfo
  );

  // ItemBay 컴포넌트에서 실행
  const handleBay = async (item) => {
    if (ip_amount >= item.selling_price) {
      dispatch(modalChange({ change: "loading" }));
      const userAndItem = {
        user_nick: nickName,
        address,
        item,
      };
      const { status, data } = await transactionBuy(userAndItem);
      if (status === 200) {
        const { newMarketList, updateHaesSal, updateMyBag } = data;
        console.log(updateHaesSal);
        // 여기부터 시작 200 받고 데이터 업데이트 하기
        dispatch(bagUpdate({ bag: updateMyBag }));
        dispatch(handleMarketList({ list: newMarketList }));
        dispatch(
          myInfoSave({
            data: { haes_sal_amount: updateHaesSal.haes_sal_amount },
          })
        );
      }
      dispatch(modalChange({ change: "" }));
    } else {
      dispatch(modalChange({ change: "error/haes_sal" }));
    }
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <animated.div
      style={{
        x,
        y,
      }}
    >
      <ExchangeBox open={open}>
        <div className="header" {...bindDivPos()}>
          Exchange
        </div>
        <div className="listBox">
          {list.map((item, index) => (
            <ItemBox key={index} data={item} handleBay={handleBay} />
          ))}
        </div>
        <div
          className="addBox cc"
          onClick={() => {
            dispatch(sellChange({ change: true }));
            dispatch(handleTopMenu({ select: "Inventory" }));
          }}
        >
          <div className="buttonBox cc">등록하기</div>
        </div>
      </ExchangeBox>
    </animated.div>
  );
};

export default Exchange;
