import {} from "express-async-errors";
import {
  generateAccessToken,
  generateRefreshToken,
  generateRenewToken,
} from "../middleware/validation";
import { userRegister, userLogin } from "../db_Process/sign.db";
import Web3 from "web3";
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/b03f802e554f441786b51c437837bfe4%22"
  )
);

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

const login = async (req, res, next) => {
  const { user_id, user_pwd } = req.body;
  const logined = await userLogin(user_id, user_pwd);

  if (!logined) {
    return res.status(401).json({ message: "회원가입을먼저해주세요" });
  }
  const token = generateAccessToken(
    logined.user_nick,
    logined.address,
    logined.token_amount
  );
  const [accessToken, refreshToken] = token;

  res.status(200).json({
    token: { accessToken: accessToken, refreshToken: refreshToken },
    logined,
  });
};

// 로그인 재연장
const loginExtension = async (req, res, next) => {
  // 이미 한 번 이상 로그인 한 회원이므로 로그인 과정 생략
  // 기존 refresh 사용한 access token 발행
  const { user_id } = req.body;
  const renewToken = await generateRenewToken(req.headers, user_id);
  if (!renewToken) {
    res.sendStatus(412); // 412: 클라이언트의 헤더에 있는 전제조건은 서버의 전제조건에 적절하지 않습니다.
  } else {
    //console.log(renewToken, "🔓 새로 발급한 token");

    res.status(200).json({ message: "재연장 성공!" });
  }
};

const logout = async (req, res, next) => {
  // 헤더에 토큰이 아예 없으면 로그인 한 회원 아님
  if (!req.headers.authorization) {
    res.status(412).json({ message: "no Auth" });
  } else {
    let body = "🔥 bye";
    res.removeHeader("Authorization");
    res.end(body);
  }
};

export { register, login, loginExtension, logout };
