import { tokenValidation } from "../middleware/validation";
import {
  postTransactionSell,
  postTransactionExchange,
  tokenAmountUpdate,
} from "../db_Process/transaction.db";

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
  if (dbResult && tokenData) {
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({ message: "아이템 등록에 실패했어요 🥲" });
  }
};

const exchange = async (req, res, next) => {
  // const tokenData = tokenValidation();
  // --> db 프로세스 코드 넣기(토큰에서 address, 바디에서 bagArray)
  const dbResult = await postTransactionExchange(bag, address);
  if (dbResult && tokenData) {

    res.status(200).send(dbResult);
  } else {
    res.status(400).send({ message: "전송을 실패했어요 😭" });
  }
};

const buy = async (req, res, next) => {
  // const { address, token_amount } = req.body; //db테스트용
  const dbResult_token = await tokenAmountUpdate(address, token_amount);
  const dbResult_bag = await postTransactionExchange(address, bag);
  //컨트롤러 마무리 해야함
};

export { sell, exchange, buy };
