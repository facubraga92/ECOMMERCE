const Sequelize = require("sequelize");
const db = require("../config/db.js");

class Products_variants extends Sequelize.Model {}

Products_variants.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    size: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    color: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "products_variants" , timestamps: false }
);

module.exports = Products_variants;
