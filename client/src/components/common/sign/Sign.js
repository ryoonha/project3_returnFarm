import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { gameBag, gameRandCreate } from "../../../api/game";
import { nftCreate } from "../../../api/nft";
import { signLogin, signRegister } from "../../../api/sign";
import { transactionList } from "../../../api/transaction";
import { initSocketConnection } from "../../../libs/socketio";
import { handleMarketList } from "../../../stores/reducers/gameSlice";
import { modalChange } from "../../../stores/reducers/stateSlice";
import {
  bagUpdate,
  myInfoSave,
  tileUpdate,
} from "../../../stores/reducers/userSlice";

const SignContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.178);

  .signHeader {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    img {
      width: 400px;
      height: 130px;
      object-fit: cover;
    }
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

  const [testImg, setTestImg] = useState();

  const testFun = async () => {
    console.log(testImg);

    const formData = new FormData();
    formData.append("address", "0x2e11159efC28b251f5c6497FD39d6562731C252e");
    formData.append("name", "kkm");
    formData.append("description", "테스트 입니다");
    formData.append("file", testImg[0]);
    // formData.append("file", JSON.stringify(testImg));

    const data = await nftCreate(formData);
    console.log(data);
  };

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
      const { status } = await signRegister(userData);
      if (status === 201) {
        setToggleRegister(false);
        setUseData({
          user_id: "",
          user_pwd: "",
          user_nick: "",
        });
      }
    } catch (err) {
      alert(err.response.data.massage);
    }
  };
  const handleLogin = async () => {
    const { user_id, user_pwd } = userData;
    dispatch(modalChange({ change: "loading" }));
    try {
      const { data } = await signLogin({ user_id, user_pwd });
      const { logined, token } = data;
      if (initSocketConnection(data)) {
        localStorage.setItem("token", JSON.stringify(token));
        const bagInfo = await gameBag({ address: logined.address });
        const randInfo = await gameRandCreate({ address: logined.address });
        const marketList = await transactionList();
        await dispatch(myInfoSave({ data: logined, token: token }));
        await dispatch(bagUpdate({ bag: bagInfo.data }));
        await dispatch(tileUpdate({ tile: randInfo.data }));
        await dispatch(handleMarketList({ list: marketList.data }));
        await setLoginCheck(true);
        await setUseData({
          user_id: "",
          user_pwd: "",
          user_nick: "",
        });
      }
      dispatch(modalChange({ change: "" }));
    } catch (e) {
      localStorage.clear();
      dispatch(modalChange({ change: "" }));
      setUseData({
        user_id: "",
        user_pwd: "",
        user_nick: "",
      });
      alert(e.response.data.message);
    }
  };

  return (
    <SignContainer
      errorHandle={errorHandle}
      onKeyDown={(e) => {
        if (e.key === "Enter" && userDateValidation()) {
          if (!toggleRegister) {
            handleLogin();
          } else {
            handleRegister();
          }
        }
      }}
    >
      <div className="signHeader">
        <img src="/images/return_Farm_logo.png" alt="" />
      </div>

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
          <input type="file" onChange={(e) => setTestImg(e.target.files)} />
          <button onClick={() => testFun()}>테스트</button>
        </div>
      </div>
    </SignContainer>
  );
};

export default Sign;
