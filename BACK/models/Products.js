const Sequelize = require("sequelize");
const db = require("../config/db.js");

class Products extends Sequelize.Model {}

Products.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
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
    category: {
      type: Sequelize.ENUM("remeras", "hoodies", "accesorios"),
      allowNull: false,
      defaultValue: "remeras",
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    imgURL: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
  },
  { sequelize: db, modelName: "products", timestamps: false }
);

module.exports = Products;
