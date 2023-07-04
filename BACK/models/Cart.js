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
    ammount: {
      type: Sequelize.DECIMAL(10, 2),
    },
    order_date: {
      type: Sequelize.DATEONLY,
    },
    shipping_address: {
      type: Sequelize.STRING,
    },
    order_status: {
      type: Sequelize.ENUM("pay_pending", "in_process", "sended"),
    },
  },
  { sequelize: db, modelName: "cart", timestamps: false }
);

module.exports = Cart;
