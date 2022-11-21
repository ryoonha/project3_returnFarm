import { tokenValidation } from "../middleware/validation";
import {
  postTransactionSell,
  postTransactionExchange,
  tokenAmountUpdate,
} from "../db_Process/transaction.db";
import { login } from "./sign.controller";

const sell = async (req, res, next) => {
  // const tokenData = tokenValidation();
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
  const { address, bag } = req.body;
  // const tokenData = tokenValidation();
  // --> db 프로세스 코드 넣기(토큰에서 address, 바디에서 bagArray)
  const dbResult = await postTransactionExchange(bag, address);
  if (dbResult) {
    // && tokenData
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({ message: "전송을 실패했어요 😭" });
  }
};

// item 거래소에서 구매
const buy = async (req, res, next) => {
  console.log("😫");
  const { address, token_amount } = req.body; //db테스트용

  // token_amout: 기존 토큰, dbResult_token: 업데이트된 토큰
  // 새롭게 차감된 토큰 잔액을 넣어줘야 함 -> Jwt token 안에 넣어주기
  // client에게 jwt token, update된 bag 넘겨줘야 함

  const dbResult_token = await tokenAmountUpdate(address, token_amount);
  const dbResult_bag = await postTransactionExchange(address, bag);

  // address 일치하고(로그인성공이면 일치하는 걸로), token_amount > 구매하려는 총가격 이면, 구매 성공
  // 1. 바뀐 잔액이랑 원래 갖고 있던 토큰이랑 금액이 다른지 -> 다르면 true, 같으면 구매 실패 -> false
  // 2. bag update -> bag 바뀌면 true
  // 3. if: 두 개 조건이 && -> true 여야 구매 성공

  if ((dbResult_token, dbResult_bag)) {
    // && tokenData
    res.status(200).send({ data: dbResult_token, dbResult_bag });
  } else {
    res.status(400).send({ message: "구매 실패 😑" });
  }
};

export { sell, exchange, buy };
