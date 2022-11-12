import React from "react";
import styled from "styled-components";

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

const Sign = () => {
  return (
    <SignContainer>
      <div className="signHeader">return Farm !</div>
      <div className="signBox cc">
        <div className="signInput cc">
          아이디
          <input type="text" placeholder="아이디를 입력하세요!" />
        </div>
        <div className="signInput cc">
          비밀번호
          <input type="password" placeholder="비밀번호를 입력하세요!" />
        </div>
        <div className="signButton cc">
          <button>로그인</button>
          <button>회원가입</button>
        </div>
      </div>
    </SignContainer>
  );
};

export default Sign;
