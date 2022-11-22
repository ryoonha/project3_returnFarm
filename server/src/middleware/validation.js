import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// ----------------------* 토큰 검정  *----------------------

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

const generateAccessToken = (user_nick, address) => {
  const accessToken = jwt.sign(
    { user_nick, address },
    process.env.ACCESS_SECRET,
    {
      expiresIn: "1h",
      issuer: "return Farm;",
    }
  );
  return accessToken;
};

const generateRefreshToken = (user_nick, address) => {
  return jwt.sign({ user_nick, address }, process.env.REFRESH_SECRET, {
    expiresIn: "3d",
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
