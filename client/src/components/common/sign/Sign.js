import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  disconnectSocket,
  initSocketConnection,
  socket,
} from "../../../libs/socketio";
import { userSaveF } from "../../../stores/reducers/stateSlice";
import axios from "axios";

const SignContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  background-color: rgba(128, 128, 128, 0.178);

  .signHeader {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 50px;
  }

  .signBox {
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 20px;
    transform: translate(-50%, -50%);
    background-color: aliceblue;

    .signInput {
      flex-direction: column;
      width: 300px;
      height: 50px;
      margin: 15px 0px 0px 0px;
      padding: 10px;
      font-size: 16px;
      transition: 0.2s;
      input {
        height: 30px;
        text-align: center;
      }
      :hover {
        background-color: #fff7ec;
      }
    }
    .signButton {
      flex-direction: column;
      margin-top: 10px;
      margin-bottom: 10px;
      button {
        width: 80px;
        height: 30px;
        margin-top: 10px;
        border: 1px solid rgb(128, 128, 128);
        border-radius: 10px;
        background-color: rgb(255, 255, 255);
        text-align: center;
        cursor: pointer;
        transition: 0.2s;
        :hover {
          background-color: rgb(179, 255, 144);
        }
      }
    }
  }
`;

const Sign = ({ setLoginCheck }) => {
  const dispatch = useDispatch();
  const [userData, setUseData] = useState({
    id: "",
    password: "",
    nickName: "",
    account: "",
  });

  const userSave = () => {
    dispatch(userSaveF({ user: userData.id }));
    socket.emit("loginUser", userData.id);

    setUseData({
      id: "",
      password: "",
      nickName: "",
      account: "",
    });
  };

  const test = () => {
    axios
      .put(
        "http://localhost:4000/game/rand",
        { user_id: "kkm", user_pwd: 123, user_nick: "냥냥고" },
        {
          "Content-Type": "application/json",
          withCredentials: true,
        }
      )
      .then((e) => console.log(e));
  };

  // 토큰을 서버로 보낼 때
  // axios
  //     .get("https://localhost:4000/accesstokenrequest", {
  //       // "Content-type": "application/json",
  //       headers: {
  //         Authorization: "Bearer " + accessToken,
  //       },
  //       withCredentials: true,
  //     })

  return (
    <SignContainer>
      <div className="signHeader">return Farm !</div>
      <div className="signBox cc">
        <div className="signInput cc">
          아이디
          <input
            type="text"
            placeholder="아이디를 입력하세요!"
            value={userData.id}
            onChange={(e) => {
              setUseData({ ...userData, id: e.target.value });
            }}
          />
        </div>
        <div className="signInput cc">
          비밀번호
          <input
            type="password"
            placeholder="비밀번호를 입력하세요!"
            value={userData.password}
            onChange={(e) =>
              setUseData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <div className="signButton cc">
          <button
            onClick={(e) => {
              if (userData.id.length > 0) {
                setLoginCheck(initSocketConnection());
                setTimeout(() => {
                  e.preventDefault();
                  userSave();
                }, 500);
              } else {
                alert("아이디 입력하세요");
              }
            }}
          >
            로그인
          </button>
          <button onClick={() => disconnectSocket()}>회원가입</button>
          <button onClick={() => test()}>테스트</button>
        </div>
      </div>
    </SignContainer>
  );
};

export default Sign;
