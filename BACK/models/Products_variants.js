const Sequelize = require("sequelize");
const db = require("../db");

class Products_variants extends Sequelize.Model {}

Products_variants.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    productId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "products_variants" }
);

module.exports = Products_variants;
