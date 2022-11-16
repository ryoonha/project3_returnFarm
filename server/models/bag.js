import Sequelize from "sequelize";

module.exports = class Bag extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        address: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        item: {
          type: Sequelize.JSON,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Bag",
        tableName: "bag",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
};
