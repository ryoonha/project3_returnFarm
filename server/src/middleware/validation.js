import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// ---------------* 토큰 검정 및 refresh token *---------------

// refresh token 생성
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_SECRET, {
    expiresIn: "3d",
  });
};

// 로그인 된 상태에서 인증 필요한 페이지 이동 시, 토큰 검증
const tokenValidation = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send({ status: false, message: "다시 로그인해 주세요!" });
  } else {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    if (data) {
      res.status(401).send({ status: false, message: "다시 로그인해 주세요!" });
    } else {
      return data;
    }
  }
};

// ---------------------* 로그인 할 때 *---------------------

// 첫 로그인 토큰(access, refresh) 생성
const generateToken = (id) => {
  // 1. refresh token 생성 -> renew에서 비교해보기
  const refreshToken = generateRefreshToken(id);
  // 2. access token 생성
  const accessToken = jwt.sign(
    { id, refreshToken },
    process.env.ACCESS_SECRET,
    {
      expiresIn: "10s", // 시간 수정하기
      issuer: "return Farm;",
    }
  );
  return { accessToken, refreshToken };
};

// 로그인 연장 토큰(두번째 access, 기존 refresh) 생성
const generateRenewToken = (headers, id) => {
  const authorization = headers.authorization; // access 있음
  const token = authorization.split(" ")[1]; // access 전체
  // -> token decode해서 refresh secret 맞는지 verify -> access 재발급

  // decode 부분
  const parseJWT = (token) => {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  };
  const refreshToken = parseJWT(token).refreshToken; // 추출된 refresh token

  // refresh 검증 -> access 발급
  const result = jwt.verify(refreshToken, process.env.REFRESH_SECRET); // refresh 검증
  if (!result) {
    // 서버에서 발급한 refresh token 아니라면, 에러
    return false;
  }
  // refresh 포함, 새로운 access token 생성
  const finallygenerated = (id, refreshToken) => {
    return jwt.sign({ id, refreshToken }, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
    });
  };
  // console.log(id, refreshToken, "🎉");
  return finallygenerated(id, refreshToken);
};

/**
로그인 연장, 두번째 access 발급 과정 로직 
// 만료 -> access headers 안의 refresh token 암호화 추출
// refresh token decode -> secret key로 검증 -> 일치하면 
// 새로운 access token 발급(인자로 req로 받은 id, 기존의 refresh(암호화된상태)를 넣어줌)
 */

export { tokenValidation, generateToken, generateRenewToken };
