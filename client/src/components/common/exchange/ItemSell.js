import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { gameBagUpdate } from "../../../api/game";
import { transactionList, transactionSell } from "../../../api/transaction";
import { itemList } from "../../../data/item";
import {
  handleMarketList,
  handleSell,
} from "../../../stores/reducers/gameSlice";
import {
  handleTopMenu,
  modalChange,
  sellChange,
} from "../../../stores/reducers/stateSlice";
import { bagUpdate } from "../../../stores/reducers/userSlice";

const ItemSellBox = styled.div`
  position: absolute;
  top: 50%;
  left: -70%;
  width: 300px;
  height: 500px;
  background-color: var(--back);
  color: white;
  input {
    width: 150px;
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
  .header {
    border-radius: 0px;
    background-color: var(--headerBack);
    :hover {
      background-color: var(--back);
    }
  }
  .itemPreviewBox {
    flex-direction: column;
    width: 100%;
    height: 100px;
    .itemPrevieImg {
      width: 50px;
      height: 50px;
      /* transform: translateY(-10px); */
      background-color: rgba(226, 226, 226, 0.3);
      img {
        width: 100%;
        height: 50px;
        object-fit: cover;
      }
    }
    .itemPrevieName {
      color: var(--itemName);
    }
  }
  .itemCount {
    flex-direction: column;
  }
  .ipCount {
    margin-top: 10px;
    flex-direction: column;
    .ipImgBox {
      img {
        width: 25px;
        height: 25px;
      }
    }
  }
  .itemSellBox {
    width: 100%;
    height: 120px;
    button {
      width: 110px;
      height: 50px;
      font-size: 18px;
      background-color: rgb(226, 226, 226);
      transition: 0.3s;
      cursor: pointer;
      :hover {
        background-color: rgb(196, 196, 196);
      }
    }
  }
`;

const ItemSell = ({ dispatch }) => {
  const item = useSelector((state) => state.game.sellData);
  const { address } = useSelector((state) => state.user.myInfo);
  const [sell, setSell] = useState({
    item_count: 0,
    selling_price: 0,
  });

  const handleItemSell = async () => {
    dispatch(modalChange({ change: "loading" }));
    const sellData = {
      ...item,
      ...sell,
      address,
    };
    const { data } = await transactionSell(sellData);
    console.log(data);
    if (data) {
      const updateData = {
        address,
        itemName: item.item_name,
        count: sell.item_count,
      };
      // 거래소에 올린 아이템을 DB 가방테이블에 빼거나 삭제해서 저장
      const itemUpdate = await gameBagUpdate(updateData);
      // 최신화된 마켓 리스트를 불러온다
      const marketList = await transactionList();
      // 가방을 업데이트 한다
      await dispatch(bagUpdate({ bag: itemUpdate.data }));
      // 클라이언트에 마켓 리스트를 적용한다.
      await dispatch(handleMarketList({ list: marketList.data }));
    } else {
      alert("아이템 등록에 실패 했습니다!");
    }
    dispatch(modalChange({ change: null }));
    dispatch(sellChange({ change: false }));
    dispatch(handleTopMenu({ select: "Exchange" }));
  };

  useEffect(() => {
    return () => dispatch(handleSell({ itemInfo: null }));
  }, []);

  return (
    <ItemSellBox>
      <div
        className="header"
        onClick={() => dispatch(sellChange({ change: false }))}
      >
        닫기
      </div>
      <div className="itemPreviewBox cc">
        <div className="itemPrevieImg cc">
          {item ? (
            <img src={itemList[item.item_name].img} alt="" />
          ) : (
            <FontAwesomeIcon icon="fa-solid fa-question" />
          )}
        </div>
        <div className="itemPrevieName">
          {item ? item.item_name : "아이템을 선택해주세요"}
        </div>
      </div>
      <div className="itemCount cc">
        <div>개수 설정</div>
        <input
          disabled={item ? false : true}
          type="number"
          min="1"
          max={item ? item.item_count : 1}
          placeholder={item ? "개수를 입력하세요" : "아이템을 선택 하세요"}
          onChange={(e) => setSell({ ...sell, item_count: e.target.value })}
        />
      </div>
      <div className="ipCount cc">
        <div className="ipImgBox cc">
          <img src="/images/tokens/day.png" alt="" />
          <div>햇살 가격 설정</div>
        </div>
        <input
          disabled={item ? false : true}
          type="number"
          min="0.01"
          max="10000"
          step="0.01"
          placeholder={item ? "가격을 입력하세요" : "아이템을 선택 하세요"}
          onChange={(e) => setSell({ ...sell, selling_price: e.target.value })}
        />
      </div>
      <div className="itemSellBox cc">
        <button
          onClick={() => {
            if (item) {
              handleItemSell();
            }
          }}
        >
          거래소 등록
        </button>
      </div>
    </ItemSellBox>
  );
};

export default ItemSell;
