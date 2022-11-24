import {} from "express-async-errors";
import {
  generateAccessToken,
  generateRefreshToken,
  generaterenewAccessToken,
  generateRenewToken,
} from "../middleware/validation";
import { userRegister, userLogin } from "../db_Process/sign.db";
import Web3 from "web3";
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4%22"
  )
);

// 회원가입
const register = async (req, res, next) => {
  const { user_id, user_pwd, user_nick } = req.body;
  const { address, privateKey } = web3.eth.accounts.create();
  const dbResult = await userRegister(
    user_id,
    user_pwd,
    user_nick,
    address,
    privateKey
  );
  const [bool, msg] = dbResult;

  if (!bool) {
    res.status(409).json({ massage: msg });
  } else {
    res.status(201).json({ message: "🎉 SUCCESS!" });
  }
};

// 로그인
const login = async (req, res, next) => {
  const { user_id, user_pwd } = req.body;
  const logined = await userLogin(user_id, user_pwd);

  if (!logined) {
    return res.status(401).json({ message: "회원가입을먼저해주세요" });
  }
  const accessToken = generateAccessToken(
    logined.user_nick,
    logined.address,
    logined.ip_amount
  );
  const refreshToken = generateRefreshToken(logined.user_nick, logined.address);
  res.status(200).json({
    token: { accessToken: accessToken, refreshToken: refreshToken },
    logined,
  });
};

// 로그인 재연장, body의 refresh token 검증 -> access token 발급
const loginExtension = async (req, res, next) => {
  const { refreshToken } = req.body;
  const renewAccessToken = generateRenewToken(refreshToken); // 검정, 생성
  if (!renewAccessToken) {
    res.sendStatus(401);
  } else {
    res.status(200).json({
      message: "재연장 성공!",
      token: { accessToken: renewAccessToken, refreshToken: refreshToken },
    });
  }
};

// 로그아웃
const logout = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(412).json({ message: "no Auth" }); // 412: 클라이언트의 헤더에 있는 전제조건은 서버의 전제조건에 적절하지 않습니다.
  } else {
    let body = "bye 👋🏻";
    res.removeHeader("Authorization");
    res.end(body);
  }
};

export { register, login, loginExtension, logout };
