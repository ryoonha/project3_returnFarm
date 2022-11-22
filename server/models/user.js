import Sequelize from "sequelize";

module.exports = class User extends Sequelize.Model {
  // class User extends Sequelize.Model {
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
        user_pfp: {
          type: Sequelize.TEXT,
        },
        address: {
          type: Sequelize.STRING(100),
          unique: true,
        },
        private_key: {
          type: Sequelize.STRING(100),
          unique: true,
        },
        token_amount: {
          type: Sequelize.INTEGER,
        },
        crop_count: {
          type: Sequelize.INTEGER,
        },
        crop_per: {
          type: Sequelize.INTEGER,
        },
        play_time: {
          type: Sequelize.STRING(10),
        },
        createdAt: {
          type: "TIMESTAMP",
          defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        createdAt: true,
        updatedAt: false,
        underscored: true,
        modelName: "User", // 모델명
        tableName: "users", // 테이블명
        paranoid: false, // x : deletedAt 자동 생성
        charset: "utf8", // 한글 입력 설정
        collate: "utf8_general_ci",
      }
    );
  }
};
