const Sequelize = require("sequelize");
const db = require("../config/db.js");

class CartItem extends Sequelize.Model {}

CartItem.init(
  {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      primaryKey: true,
    },
    cartId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "cartItem", timestamps: false }
);

module.exports = CartItem;
