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
import { transactionBuy, transactionList } from "../../../api/transaction";
import { bagUpdate, myInfoSave } from "../../../stores/reducers/userSlice";
import { handleMarketList } from "../../../stores/reducers/gameSlice";

const ExchangeBox = styled(BasicBox)`
  display: flex;
  flex-direction: column;
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
      // 아이템 구입 요청 보내기
      const { status, data } = await transactionBuy(userAndItem);
      if (status === 200) {
        // 업데이트 된 거래소리스트, 구입 유저 햇살, 가방을 구조분해
        const { newMarketList, updateHaesSal, updateMyBag } = data;
        // 구입한 아이템이 적용된 가방을 리덕스에 저장
        dispatch(bagUpdate({ bag: updateMyBag }));
        // 구입한 아이템이 제거된 거래소 리스트를 리덕스에 저장
        dispatch(handleMarketList({ list: newMarketList }));

        // 사용자 정보 업데이트
        dispatch(
          myInfoSave({
            data: { haes_sal_amount: updateHaesSal.haes_sal_amount },
          })
        );
      } else {
        // 구입하려는 아이템이 이미 팔렸을 경우
        const marketList = await transactionList();
        dispatch(handleMarketList({ list: marketList.data }));
        dispatch(modalChange({ change: "error/sold" }));
      }
      dispatch(modalChange({ change: "" }));
    } else {
      dispatch(modalChange({ change: "error/haes_sal" }));
    }
  };

  useEffect(() => {
    // 거래소 열 때 리스트 갱신
    // const marketList = await transactionList();
    // dispatch(handleMarketList({ list: marketList.data }));
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
          거래소
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
