import React, { useState } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox } from "../../../libs/cssFrame";
import DragDrop from "./DragDrop";

const StatusBox = styled(BasicBox)`
  left: 50px;
  //background-color: #c4f3ff;

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
        margin-top: ${(props) => (props.fileData ? "10px" : "0px")};
        text-align: center;
      }
    }
    .statusUserEtc {
      width: 330px;
      height: 220px;
      margin: auto;
      //background-color: aliceblue;
    }
  }
`;

const Status = () => {
  const [x, y, bindDivPos] = useDivMove();
  const [fileData, setFileData] = useState(null); // 이미지 데이터
  const [nftName, setNftName] = useState(""); // nft 이름
  const [imgURL, setImgURL] = useState(null); //imgURL base64

  return (
    <animated.div
      style={{
        x,
        y,
      }}
    >
      <StatusBox fileData={fileData}>
        <div className="header" {...bindDivPos()}>
          Status
        </div>
        <div className="statusBody">
          <div className="statusUserBox">
            <DragDrop
              setFileData={setFileData}
              fileData={fileData}
              imgURL={imgURL}
              setImageUrl={setImgURL}
            />
            <div className="statusUserProfile">
              <div className="userNickName">kkm</div>
              <div className="userTimeData">2001.11.28</div>
            </div>
          </div>
          <div className="statusUserEtc">
            <div className="totalHarvest">총 수확 횟수: 0</div>
            <div className="harvestPercentage">수확률: 0%</div>
            <div className="playTime">플레이 타임: 10분</div>
          </div>
        </div>
      </StatusBox>
    </animated.div>
  );
};

export default Status;
