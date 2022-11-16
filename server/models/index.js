import Sequelize from "sequelize";
import { development } from "../config/settings";

//? 모델 모듈
import User from "./user";
import Bag from "./bag";
import Rand from "./rand";
import Market_item from "./market_item";
import Market_nft from "./market_nft";

const db = {};
const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  development
);

//? db객체에 모델 정보들 넣음
db.sequelize = sequelize;
db.User = User;
db.Bag = Bag;
db.Rand = Rand;
db.Market_item = Market_item;
db.Market_nft = Market_nft;

//? 모델 - 테이블 연결
User.init(sequelize);
Bag.init(sequelize);
Rand.init(sequelize);
Market_item.init(sequelize);
Market_nft.init(sequelize);

//? 모델 관계 설정
// User.associate(db);
// Inventory.associate(db);

module.exports = { db, sequelize };
