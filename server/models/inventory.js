const Sequelize = require("sequelize");

module.exports = class Inventory extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_idx: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        item: {
          type: Sequelize.STRING(20),
        },
        quantity: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Inventory",
        tableName: "inventories",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
};
