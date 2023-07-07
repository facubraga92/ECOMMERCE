const Sequelize = require("sequelize");
const db = require("../config/db.js");

class Categories extends Sequelize.Model {}

Categories.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.ENUM("remeras", "hoodies", "accesorios"),
      allowNull: false,
      defaultValue: "remeras",
    },
  },
  { sequelize: db, modelName: "categories", timestamps: false }
);

module.exports = Categories;
