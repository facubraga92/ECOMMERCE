const Sequelize = require("sequelize");
const db = require("../config/db.js");

class Categories extends Sequelize.Model {}

Categories.init(
  {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      primaryKey: true,
    },
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "categories" }
);

module.exports = Categories;
