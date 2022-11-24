import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { socket } from "../../../libs/socketio";

const ChattingBox = styled.div`
  position: fixed;
  width: 300px;
  height: 300px;
  bottom: 90px;

  .chatting {
    width: 100%;
    height: 250px;
    padding: 10px;
    border-top: 1px solid rgb(214, 214, 214);
    border-right: 1px solid rgb(214, 214, 214);
    border-radius: 20px 20px 0px 0px;
    background-color: rgba(255, 255, 255, 0.829);
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-thumb {
      height: 50%; /* 스크롤바의 길이 */
      background: rgb(164, 199, 248); /* 스크롤바의 색상 */

      border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(84, 155, 255, 0.1); /*스크롤바 뒷 배경 색상*/
    }

    .chatBox,
    .myChatBox {
      display: flex;
      margin-top: 15px;

      .profileImg {
        width: 40px;
        height: 40px;
        margin-top: auto;
        border-radius: 50%;
        background-color: aqua;
      }
      .chatTextBox {
        width: 200px;
        word-break: break-all;
        .chatName {
          color: rgb(133, 133, 133);
          font-size: 12px;
          font-weight: 600;
          margin: 0px 0px 3px 15px;
        }
        .chatText {
          margin-left: 3px;
          padding: 5px 10px 5px 10px;
          border-radius: 15px 15px 15px 0px;
          background-color: rgb(235, 242, 255);
        }
      }
      .chatTime {
        color: rgb(133, 133, 133);
        font-size: 12px;
        margin-top: auto;
      }
    }
    .myChatBox {
      flex-direction: row-reverse;
      .profileImg {
        display: none;
      }
      .chatTextBox {
        .chatName {
          display: none;
        }
        .chatText {
          margin-left: 5px;
          padding: 5px 10px 15px 10px;
          border-radius: 15px 15px 0px 15px;
          background-color: rgb(245, 245, 245);
        }
      }
    }
  }
  .chatInputBox {
    position: relative;
    width: 100%;
    height: 50px;
    background-color: rgb(255, 255, 255);
    border-right: 1px solid rgb(214, 214, 214);
    //transform: translateY(-10px);

    input {
      width: 100%;
      height: 100%;
      padding-left: 10px;
      border: 0px;
      background-color: rgb(235, 244, 255);
      border-radius: 30px;

      :focus {
        outline: 0px;
      }
    }
    button {
      position: absolute;
      top: 50%;
      right: 10px;
      width: 35px;
      height: 35px;
      border: 0px;
      border-radius: 50%;
      background-color: rgb(94, 94, 255);
      transform: translateY(-50%) rotate(10deg);
      color: white;
      font-size: 18px;
      transition: 0.2s;
      :hover {
        background-color: rgb(51, 51, 255);
        transform: translateY(-50%) rotate(20deg);
      }
      .paper {
        transform: translate(-2px, -1px);
      }
    }
  }
  .chatUserListBox {
    position: absolute;
    top: 0px;
    right: ${(props) => (props.toggle ? "-101px" : "0px")};
    height: 280px;
    transition: 0.2s;
    z-index: -10;
    .chatUserList {
      //display: ${(props) => (props.toggle ? "block" : "none")};
      opacity: ${(props) => (props.toggle ? "1" : "0")};
      width: 100px;
      height: 100%;
      transition: 0.2s;
      transform: translateY(20px);
      background-color: rgb(255, 251, 228);
    }
    .chatUserHide {
      position: absolute;
      top: 0px;
      right: -15px;
      width: 15px;
      height: 100%;
      background-color: rgba(240, 248, 255, 0.525);
      transform: translateY(20px);
      transition: 0.2s;
      :hover {
        background-color: rgba(151, 151, 151, 0.525);
      }
    }
  }
`;

let save = 0;
const Chatting = () => {
  const chatRef = useRef();
  // 채팅은 서버에서 받아 바로바로 표시
  const [message, setMessage] = useState("");
  const [toggle, setToggle] = useState(false);

  const { userList, chatList } = useSelector((state) => state.game);
  const { nickName } = useSelector((state) => state.user.myInfo);

  const handleSendMessage = (e) => {
    e.preventDefault();
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    if (message.trim() && nickName) {
      socket.emit("message", {
        name: nickName,
        text: message,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        date: `${hours === 0 ? 12 : hours}:${minutes}`,
      });
    }
    setMessage("");
  };

  useEffect(() => {
    if (chatRef.current) {
      const clientHeight = chatRef.current.clientHeight;
      const scrollTop = chatRef.current.scrollTop; // 현재 보이는 곳에서 맨 위
      const eh = clientHeight + scrollTop;
      const isScroll = save <= eh;
      save = chatRef.current.scrollHeight;
      if (isScroll) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  }, [chatList]);

  return (
    <ChattingBox toggle={toggle}>
      <div className="chatting" ref={chatRef}>
        {chatList.map((msgData, index) => (
          <div
            className={nickName === msgData.name ? "myChatBox" : "chatBox"}
            key={index}
          >
            <div className="profileImg cc">
              <img src="" alt="프사" />
            </div>

            <div className="chatTextBox">
              <div className="chatName">{msgData.name}</div>
              <div className="chatText">{msgData.text}</div>
            </div>
            <div className="chatTime">{msgData.date}</div>
          </div>
        ))}
      </div>
      <div className="chatInputBox">
        <input
          placeholder="메세지 입력"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(e);
            }
          }}
        />
        <button onClick={handleSendMessage} className="cc">
          <FontAwesomeIcon icon="fa-regular fa-paper-plane" className="paper" />
        </button>
      </div>
      <div className="chatUserListBox">
        <div className="chatUserList">
          {userList.map((user, index) => (
            <div style={{ textAlign: "center" }} key={index}>
              {user.nickName.logined.user_nick}
            </div>
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
