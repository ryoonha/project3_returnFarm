import Sequelize from "sequelize";

module.exports = class Market_nft extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // 시퀄라이즈는 id 자동 생성 (auto_increament)
        nft_name: {
          type: Sequelize.STRING(30),
          allowNull: false, //NOT NULL
        },
        selling_price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        metadata_url: {
          type: Sequelize.STRING(255),
        },
        img_url: {
          type: Sequelize.STRING(255),
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
        modelName: "Market_nft", // 모델명
        tableName: "market_nft", // 테이블명
        paranoid: false, // x : deletedAt 자동 생성
        charset: "utf8", // 한글 입력 설정
        collate: "utf8_general_ci",
      }
    );
  }
};
