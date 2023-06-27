const Sequelize = require("sequelize");
const db = require("../db");

class Products extends Sequelize.Model {}

Products.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "products" }
);

module.exports = Products;
