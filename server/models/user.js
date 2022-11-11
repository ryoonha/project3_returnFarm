const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
         // 시퀄라이즈는 id 자동 생성 (auto_increament)
         user_id: {
            type: Sequelize.STRING(20),
            allowNull: false, //NOT NULL
            unique: true, // 중복 비허용
         },
         user_pwd: {
            type: Sequelize.STRING(20),
            allowNull: false,
         },
         user_nick: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true,
         },
         account: {
            type: Sequelize.STRING(70),
            allowNull: false,
            unique: true,
         },
         rand: {
            type: Sequelize.JSON,
         },
         },
         {
         sequelize,
         timestamps: false,
         underscored: false,
         modelName: "User", // 모델명
         tableName: "users", // 테이블명
         paranoid: true, // deletedAt 자동 생성
         charset: "utf8", // 한글 입력 설정
         collate: "utf8_general_ci",
         }
      );
   }
};
