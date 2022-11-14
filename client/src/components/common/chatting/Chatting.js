import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { socket } from "../../../libs/socketio";

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
    button {
      position: absolute;
      bottom: 0px;
      right: 0px;
      /* margin: auto; */
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
  const [message, setMessage] = useState("");
  const [toggle, setToggle] = useState(false);

  const { userList, chatList } = useSelector((state) => state.socket);

  // 임시로 아이디 사용, 스토리지 사용
  //const { id } = JSON.parse(localStorage.userData);

  const { userTest } = useSelector((state) => state.state);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && userTest) {
      socket.emit("message", {
        name: userTest,
        text: message,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };

  return (
    <ChattingBox toggle={toggle}>
      <div className="chatting">
        {chatList.map((msgData, index) => (
          <div key={index}>
            <div>이름:{msgData.name}</div>
            <div>내용:{msgData.text}</div>
          </div>
        ))}
      </div>
      <div className="chatInputBox">
        <input
          placeholder="메세지 입력"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
      <div className="chatUserListBox">
        <div className="chatUserList">
          {userList.map((user, index) => (
            <div key={index}>{user[0]}</div>
          ))}
        </div>
        <div className="chatUserHide cc" onClick={() => setToggle(!toggle)}>
          <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
        </div>
      </div>
    </ChattingBox>
  );
};

export default Chatting;
