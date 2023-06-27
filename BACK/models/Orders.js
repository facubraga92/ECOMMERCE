const { DataTypes, Model } = require("sequelize");
const sequelize = require("sequelize");

class Orders extends Model {}

Orders.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "orders",
  }
);

module.exports = Orders;
