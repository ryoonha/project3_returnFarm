import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

const accessToken = async (data, next) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: "1h",
    issuer: "return Farm;",
  });
  return token;
};

const refreshToken = async (data, next) => {};

export { accessToken, tokenValidation };
