const Sequelize = require("sequelize");
const db = require("../config/db.js");

class Products extends Sequelize.Model {}

Products.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "products", timestamps: false }
);

module.exports = Products;
