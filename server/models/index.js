// import dorenv from 'dotenv';
// dotenv.config();
// const env = process.env;
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/settings")[env];

//? 모델 모듈
const User = require("./user");
const Inventory = require("./inventory");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//? db객체에 모델 정보들 넣음
db.sequelize = sequelize;
db.User = User;
db.Inventory = Inventory;

//? 모델 - 테이블 연결
User.init(sequelize);
Inventory.init(sequelize);

//? 모델 관계 설정
// User.associate(db);
// Inventory.associate(db);

module.exports = { db, sequelize };
