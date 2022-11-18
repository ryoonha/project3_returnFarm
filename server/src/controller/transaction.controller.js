import { tokenValidation } from "../middleware/validation";
import {
  postTransactionSell,
  postTransactionExchange,
} from "../db_Process/transaction.db";

const sell = async (req, res, next) => {
  // const tokenData = tokenValidation();
  // --> db 프로세스 코드 넣기
  const { item_name, item_count, selling_price, address } = req.body;
  const dbResult = await postTransactionSell(
    item_name,
    item_count,
    selling_price,
    address
  );
  //
  if (dbResult) {
    //&& tokenData
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({ message: "아이템 등록에 실패했어요 🥲" });
  }
}; // 포스트맨 true 출력

const exchange = async (req, res, next) => {
  // const tokenData = tokenValidation();
  // --> db 프로세스 코드 넣기
  const { item_name, item_count, address } = req.body;
  const dbResult = await postTransactionExchange(
    item_name,
    item_count,
    address
  );
  if (dbResult) {
    //&& tokenData
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({ message: "전송을 실패했어요 😭" });
  }
}; // 포스트맨 전송 실패했어요 출력

export { sell, exchange };
