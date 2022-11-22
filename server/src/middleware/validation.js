import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// ---------------* 토큰 검정 및 refresh token *---------------

// refresh token 생성
const generateRefreshToken = (user_nick) => {
  console.log("🔎🔎", user_nick, process.env.REFRESH_SECRET);
  return jwt.sign({ user_nick }, process.env.REFRESH_SECRET, {
    expiresIn: "3d",
  });
};

// 로그인 된 상태에서 인증 필요한 페이지 이동 시, 토큰 검증
const tokenValidation = (accessToken) => {
  if (!accessToken) {
    return false;
  } else {
    const data = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    if (data) {
      return data;
    } else {
      return false;
    }
  }
};

// ---------------------* 로그인 할 때 *---------------------

// 첫 로그인 토큰(access, refresh) 생성
// nick, address, token_amount
const generateAccessToken = (user_nick, address, token_amount) => {
  // 1. refresh token 생성 -> renew에서 비교해보기
  console.log("🔎🔎🔎", user_nick, address, token_amount);
  const refreshToken = generateRefreshToken(user_nick);
  // 2. access token 생성
  const accessToken = jwt.sign(
    { user_nick, address },
    process.env.ACCESS_SECRET,
    {
      expiresIn: "1h",
      issuer: "return Farm;",
    }
  );
  return [accessToken, refreshToken];
};

// 로그인 연장: req.body의 refresh token이 맞는지 확인해서 새로운 access token 생성 -> 발급
const generateRenewToken = (req) => {
  const result = jwt.verify(req.body.refreshToken, process.env.REFRESH_SECRET); // refresh 검증
  if (!result) {
    // 서버에서 발급한 refresh token 아니라면, 에러
    return false;
  } else {
    const renewAccessToken = (user_nick, address) => {
      return jwt.sign({ user_nick, address }, process.env.ACCESS_SECRET, {
        expiresIn: "1h",
      });
    };
    return renewAccessToken(user_nick, address);
    // console.log(user_nick, address, "🎉");
  }
};

export {
  tokenValidation,
  generateAccessToken,
  generateRefreshToken,
  generateRenewToken,
};
