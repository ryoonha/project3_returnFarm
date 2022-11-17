import { tokenValidation } from "../middleware/validation";
import db from "../db_Process/transaction.db";
// bag, market db나 db_process 필요

// 아이템 판매(를 위한 등록)
// trascation.db의 함수를 불러와서 실행
const sell = async (req, res, next) => {
  // const tokenData = tokenValidation();
  // --> db 프로세스 코드 넣기
  // const { item_name, item_count, selling_price, address } = req.body;
  console.log("🥯");
  const { item_name, item_count, selling_price, address } = req.body;
  const dbResult = await db.postTransactionSell(
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
};

// 아이템 전송
const exchange = async (req, res, next) => {
  // const tokenData = tokenValidation();
  // --> db 프로세스 코드 넣기 (토큰에서 address, 바디에서 bagArray)
  const dbResult = await db.postTransactionExchange(bag, address);
  if (dbResult && tokenData) {
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({ message: "아이템 등록에 실패했어요 🥲" });
  }
};

export { sell, exchange };
