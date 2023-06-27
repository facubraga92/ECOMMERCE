const { DataTypes, Model } = require("sequelize");
const sequelize = require("sequelize");

class Oder_details extends Model {}

Oder_details.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "oder_details",
  }
);

module.exports = Oder_details;
