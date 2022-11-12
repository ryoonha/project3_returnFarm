import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";

const ChattingBox = styled.div`
  position: fixed;
  width: 300px;
  height: 300px;
  bottom: 90px;
  border-top: 1px solid rgb(180, 180, 180);
  border-right: 1px solid rgb(180, 180, 180);

  .chatting {
    width: 100%;
    height: 250px;
    background-color: rgb(240, 248, 255);
  }
  .chatInputBox {
    width: 100%;
    height: 50px;
    background-color: yellow;

    input {
      width: 100%;
      height: 100%;
      padding-left: 10px;
      border: 0px;
      :focus {
        outline: 0px;
      }
    }
  }
  .chatUserListBox {
    position: absolute;
    top: 0px;
    right: ${(props) => (props.toggle ? "-101px" : "0px")};
    height: 100%;
    transition: 0.2s;
    z-index: -10;
    .chatUserList {
      width: 100px;
      height: 100%;
      background-color: rgb(255, 251, 228);
    }
    .chatUserHide {
      position: absolute;
      top: 0px;
      right: -15px;
      width: 15px;
      height: 100%;
      background-color: rgba(240, 248, 255, 0.525);
      transition: 0.2s;
      :hover {
        background-color: rgba(151, 151, 151, 0.525);
      }
    }
  }
`;

const Chatting = () => {
  // 채팅은 서버에서 받아 바로바로 표시

  const [toggle, setToggle] = useState(false);

  return (
    <ChattingBox toggle={toggle}>
      <div className="chatting">asdasd</div>
      <div className="chatInputBox">
        <input />
      </div>
      <div className="chatUserListBox">
        <div className="chatUserList">
          <div>곽규명</div>
          <div>냥냥고</div>
          <div>냥냥고</div>
          <div>냥냥고</div>
          <div>냥냥고</div>
          <div>냥냥고</div>
          <div>냥냥고</div>
        </div>
        <div className="chatUserHide cc" onClick={() => setToggle(!toggle)}>
          <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
        </div>
      </div>
    </ChattingBox>
  );
};

export default Chatting;
