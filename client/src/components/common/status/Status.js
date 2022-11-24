import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox } from "../../../libs/cssFrame";
import DragDrop from "./DragDrop";
import { useSelector } from "react-redux";

const StatusBox = styled(BasicBox)`
  left: 50px;

  .statusBody {
    display: flex;
    justify-content: space-between;
    width: 98%;
    height: 92%;
    margin: auto;
    transform: translateY(-5px);

    .statusUserBox {
      width: 150px;
      height: 100%;

      .statusImgBox {
        width: 100%;
        height: 180px;
        background-color: rgb(37, 37, 37);
        border-radius: 10px;
        color: #d1d1d1;
        font-size: 100px;
      }
      .statusUserProfile {
        margin-top: 10px;
        text-align: center;
      }
    }
    .statusUserEtc {
      width: 330px;
      height: 220px;
      margin: auto;
    }
  }
`;

const Status = () => {
  const [x, y, bindDivPos] = useDivMove();
  const {
    nickName,
    address,
    profileImg,
    haetsal,
    ip_amount,
    crop_count,
    crop_per,
    play_time,
    created_at,
  } = useSelector((state) => state.user.myInfo);

  return (
    <animated.div
      style={{
        x,
        y,
      }}
    >
      <StatusBox>
        <div className="header" {...bindDivPos()}>
          Status
        </div>
        <div className="statusBody">
          <div className="statusUserBox">
            <DragDrop address={address} profileImg={profileImg} />
            <div className="statusUserProfile">
              <div className="userNickName">{nickName}</div>
              <div className="userTimeData">{created_at.split("T")[0]}</div>
            </div>
          </div>
          <div className="statusUserEtc">
            <div className="totalHarvest">햇살 : {haetsal}</div>
            <div className="totalHarvest">IP 토큰 : {ip_amount}</div>
            <div className="totalHarvest">총 수확 횟수: {crop_count}</div>
            <div className="harvestPercentage">수확률: {crop_per}%</div>
            <div className="playTime">플레이 타임: {play_time}</div>
          </div>
        </div>
      </StatusBox>
    </animated.div>
  );
};

export default Status;
