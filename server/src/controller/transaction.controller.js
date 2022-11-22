import { tokenValidation } from "../middleware/validation";
import {
  postTransactionSell,
  postTransactionExchange,
  tokenAmountUpdate,
  getTransactionList,
} from "../db_Process/transaction.db";
import { login } from "./sign.controller";

const list = async (req, res, next) => {
  const transactionList = await getTransactionList();

  if (transactionList) {
    res.status(200).send(transactionList);
  } else {
    res.status(400).send({ message: "거래소 목록을 불러오는데 실패했어요!" });
  }
};

const sell = async (req, res, next) => {
  // const tokenData = tokenValidation(); // 토큰 검정해서 아니라면 에러
  const { item_name, item_count, selling_price, address } = req.body;
  const dbResult = await postTransactionSell(
    item_name,
    item_count,
    selling_price,
    address
  );
  //
  if (dbResult) {
    // && tokenData
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({ message: "아이템 등록에 실패했어요 🥲" });
  }
};

const exchange = async (req, res, next) => {
  // const tokenData = tokenValidation();
  const { address, bag } = req.body;
  const dbResult = await postTransactionExchange(bag, address);
  if (dbResult) {
    // && tokenData
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({ message: "전송을 실패했어요 😭" });
  }
};

// token_amount(햇살): 기존 토큰, update_token_amount(햇살): 업데이트된 토큰
// 새롭게 차감된 토큰 잔액을 넣어줘야 함 -> Jwt token 안에 넣어주기
// client에게 jwt token, update된 bag 넘겨줘야 함

const buy = async (req, res, next) => {
  const { address, token_amount } = req.body;
  // access token 따로 빼기
  console.log(req.headers.authorization);
  // console.log("🔥 address:", address, "token_amount:", token_amount, "🔥"); // 🔥 address: undefined token_amount: undefined 🔥
  const update_token_amount = await tokenAmountUpdate(address, token_amount); // 에러 나는 곳
  // 어떻게 update_token_amount 안에 새로 바뀐 token_amount 넣어주지?
  // refresh token -> renew access token 하듯이?

  // 기존 amount 추출? 제거하면 되지 않을까?

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

  const dbResult_bag = await postTransactionExchange(address, bag);

  // address 일치하고(로그인성공이면 일치하는 걸로), token_amount > 구매하려는 총가격 이면, 구매 성공
  // 1. 바뀐 잔액이랑 원래 갖고 있던 토큰이랑 금액이 다른지 -> 다르면 true, 같으면 구매 실패 -> false
  // 2. bag update -> bag 바뀌면 true
  // 3. if: 두 개 조건이 && -> true 여야 구매 성공

  if ((update_token_amount, dbResult_bag)) {
    // && tokenData
    res.status(200).send({ data: update_token_amount, dbResult_bag });
  } else {
    res.status(400).send({ message: "구매 실패 😑" });
  }
};

export { list, sell, exchange, buy };
