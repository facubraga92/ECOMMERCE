const Sequelize = require("sequelize");
const db = require("../config/db.js");

class Cart_item extends Sequelize.Model {}

Cart_item.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "cart_item", timestamps: false }
);

module.exports = Cart_item;
