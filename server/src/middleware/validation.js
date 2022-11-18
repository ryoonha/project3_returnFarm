import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateAccessToken = async (data) => {
  return jwt.sign({ data }, process.env.ACCESS_SECRET, {
    expiresIn: "10",
    issuer: "return Farm;",
  });
};

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

const generateRefreshToken = async (data) => {
  return jwt.sign({ data }, process.env.REFRESH_SECRET, {
    expiresIn: "1d",
  });
};

export { generateAccessToken, tokenValidation, generateRefreshToken };
