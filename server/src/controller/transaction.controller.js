import {
  marketItem_list,
  marketItem_create,
  bag_update,
  tokenAmount_update,
  marketItem_delete,
} from "../db_Process/transaction.db";
import { userInfo } from "../db_Process/user.db";

const list = async (req, res, next) => {
  const transactionList = await marketItem_list();

  if (transactionList) {
    res.status(200).send(transactionList);
  } else {
    res.status(400).send({ message: "거래소 목록을 불러오는데 실패했어요!" });
  }
};

const sell = async (req, res, next) => {
  const { item_name, item_count, selling_price, address, time, quality } =
    req.body;
  const dbResult = await marketItem_create(
    item_name,
    item_count,
    selling_price,
    address,
    time,
    quality
  );
  //
  if (dbResult) {
    // && tokenData
    res.status(200).send(dbResult); // true 출력
  } else {
    res.status(400).send({ message: "아이템 등록에 실패했어요 🥲" });
  }
};

const exchange = async (req, res, next) => {
  // const tokenData = tokenValidation();
  const { address, nItem } = req.body;
  const dbResult = await bag_update(address, nItem);
  if (dbResult) {
    // && tokenData
    res.status(200).send(dbResult);
  } else {
    res.status(400).send({ message: "전송을 실패했어요 😭" });
  }
};

const buy = async (req, res, next) => {
  const { address, item } = req.body;
  const dbUserInfo_buyer = await userInfo(address);
  const haes_sal_B = dbUserInfo_buyer.haes_sal_amount;
  const dbUserInfo_seller = await userInfo(item.address);
  const haes_sal_S = dbUserInfo_seller.haes_sal_amount;

  if (!haes_sal_B > item.selling_price) {
    // && tokenData
    res.status(400).send({ message: "구매 실패 😑" });
  } else {
    const newMarketList = await marketItem_delete(item);
    const updateMyBag = await bag_update(address, item);
    const updateHaesSal_buyer = await tokenAmount_update(
      address,
      haes_sal_B - item.selling_price
    );
    const updateHaesSal_seller = await tokenAmount_update(
      item.address,
      haes_sal_S + item.selling_price
    );
    res.status(200).send({
      updateHaesSal_buyer,
      updateHaesSal_seller,
      updateMyBag,
      newMarketList,
    });
  }
};

export { list, sell, exchange, buy };
