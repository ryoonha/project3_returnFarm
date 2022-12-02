import React from "react";
import { DetailBox } from "../../../libs/cssFrame";
import { useSelector } from "react-redux";

const ItemStatus = ({ item, index, itemData, dispatch, handleItem }) => {
  const itemNum = useSelector((state) => state.state.itemSelect);
  if (itemNum === `item${index}`) {
    return (
      <DetailBox
        onMouseEnter={() => {
          dispatch(handleItem({ itemNum: `item${index}` }));
        }}
      >
        <div className="item cc">{item.item_name}</div>
        <div className="desc">{itemData[item.item_name].desc}</div>
        <div className="countBox">
          <div className="title">개수</div>
          <div>{item.item_count} 개</div>
        </div>
        <div className="timeBox">
          <div className="title">획득시간</div>
          <div>{item.time}</div>
        </div>
      </DetailBox>
    );
  }
};

export default ItemStatus;
