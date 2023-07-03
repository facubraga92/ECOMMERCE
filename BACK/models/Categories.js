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
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "categories" , timestamps: false}
);

module.exports = Categories;
