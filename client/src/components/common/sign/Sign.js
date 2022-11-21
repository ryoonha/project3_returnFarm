import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { gameBag } from "../../../api/game";
import { signLogin, signRegister } from "../../../api/sign";
import { initSocketConnection, socket } from "../../../libs/socketio";
import { modalChange } from "../../../stores/reducers/stateSlice";
import { myInfoSave } from "../../../stores/reducers/userSlice";

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
    height: 300px;
    border-radius: 20px;
    transform: translate(-50%, -50%);
    transition: 0.2s;
    background-color: aliceblue;

    .signInput {
      flex-direction: column;
      width: 300px;
      height: 50px;
      margin: 20px 0px 0px 0px;
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
      ::after {
        position: absolute;
        transform: translateY(30px);
        font-size: 12px;
        color: red;
      }
    }

    ${(props) =>
      props.errorHandle.user_id
        ? css`
            .sid::after {
              content: "아이디를 입력해 주세요!";
            }
          `
        : null};
    ${(props) =>
      props.errorHandle.user_pwd
        ? css`
            .spwd::after {
              content: "비밀번호를 입력해 주세요!";
            }
          `
        : null};
    ${(props) =>
      props.errorHandle.user_nick
        ? css`
            .snic::after {
              content: "닉네임을 입력해 주세요!";
            }
          `
        : null};

    .signButton {
      flex-direction: column;
      margin-top: 15px;
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
  const [toggleRegister, setToggleRegister] = useState(false);
  const [userData, setUseData] = useState({
    user_id: "",
    user_pwd: "",
    user_nick: "",
  });
  const [errorHandle, setErrorHandle] = useState({
    user_id: false,
    user_pwd: false,
    user_nick: false,
  });

  const userDateValidation = () => {
    const { user_id, user_pwd, user_nick } = userData;
    if (!user_id || !user_pwd || (!user_nick && toggleRegister)) {
      setErrorHandle({
        user_id: user_id.length > 0 ? false : true,
        user_pwd: user_pwd.length > 0 ? false : true,
        user_nick: user_nick.length > 0 ? false : true,
      });
      return false;
    } else {
      return true;
    }
  };

  const handleRegister = async () => {
    try {
      const data = await signRegister(userData);
      console.log(data);
      setToggleRegister(false);
      setUseData({
        user_id: "",
        user_pwd: "",
        user_nick: "",
      });
    } catch (err) {
      alert(err.response.data.massage);
    }
  };
  const handleLogin = async () => {
    const { user_id, user_pwd } = userData;
    dispatch(modalChange({ change: "loading" }));
    try {
      const { data } = await signLogin({ user_id, user_pwd });
      const { nickName, token } = data;
      if (initSocketConnection(nickName)) {
        localStorage.setItem("token", JSON.stringify(token));
        console.log(localStorage.getItem("token"));
        const bagInfo = await gameBag();
        console.log("???????");
        console.log(bagInfo);
        await dispatch(myInfoSave({ nickName: nickName }));
        await setLoginCheck(true);
        await setUseData({
          user_id: "",
          user_pwd: "",
          user_nick: "",
        });
      }
      dispatch(modalChange({ change: null }));
    } catch (e) {
      localStorage.clear();
      dispatch(modalChange({ change: null }));
      alert(e.response.data.message);
    }
  };

  return (
    <SignContainer errorHandle={errorHandle}>
      <div className="signHeader">return Farm !</div>
      <div className="signBox cc">
        <div className="signInput sid cc">
          아이디
          <input
            type="text"
            placeholder="아이디를 입력하세요!"
            value={userData.user_id}
            onChange={(e) => {
              setErrorHandle({ ...errorHandle, user_id: false });
              setUseData({ ...userData, user_id: e.target.value });
            }}
          />
        </div>
        <div className="signInput spwd cc">
          비밀번호
          <input
            type="password"
            placeholder="비밀번호를 입력하세요!"
            value={userData.user_pwd}
            onChange={(e) => {
              setErrorHandle({ ...errorHandle, user_pwd: false });
              setUseData({ ...userData, user_pwd: e.target.value });
            }}
          />
        </div>
        {toggleRegister ? (
          <div className="signInput snic cc">
            닉네임
            <input
              type="text"
              placeholder="닉네임을 입력하세요!"
              value={userData.user_nick}
              onChange={(e) => {
                setErrorHandle({ ...errorHandle, user_nick: false });
                setUseData({ ...userData, user_nick: e.target.value });
              }}
            />
          </div>
        ) : null}
        <div className="signButton cc">
          <button
            onClick={(e) => {
              if (userDateValidation()) {
                if (!toggleRegister) {
                  handleLogin();
                } else {
                  handleRegister();
                }
              }
            }}
          >
            {toggleRegister ? "회원가입" : "로그인"}
          </button>
          <button
            onClick={() => {
              setToggleRegister(!toggleRegister);
              setUseData({
                user_id: "",
                user_pwd: "",
                user_nick: "",
              });
              setErrorHandle({
                user_id: false,
                user_pwd: false,
                user_nick: false,
              });
            }}
          >
            {toggleRegister ? "뒤로가기" : "회원가입"}
          </button>
        </div>
      </div>
    </SignContainer>
  );
};

export default Sign;
