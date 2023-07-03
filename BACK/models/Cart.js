const Sequelize = require("sequelize");
const db = require("../config/db.js");

class Cart extends Sequelize.Model {}

Cart.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "cart" , timestamps: false}
);

module.exports = Cart;
