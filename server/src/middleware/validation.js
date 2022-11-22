import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

// refresh token
const generateRefreshToken = (user_nick, address) => {
  return jwt.sign({ user_nick, address }, process.env.REFRESH_SECRET, {
    expiresIn: "3d",
  });
};

// 로그인 시, 주는 access token
const generateAccessToken = (user_nick, address) => {
  return jwt.sign({ user_nick, address }, process.env.ACCESS_SECRET, {
    expiresIn: "1h",
    issuer: "return Farm;",
  });
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
        issuer: "returnFarm; extension",
      });
    };
    return renewAccessToken(user_nick, address);
    // console.log(user_nick, address, "🎉");
  }
};

export {
  tokenValidation,
  generateRefreshToken,
  generateAccessToken,
  generateRenewToken,
};
