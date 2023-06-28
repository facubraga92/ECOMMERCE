const Sequelize = require("sequelize");
const db = require("../config/db.js");

class Order_details extends Sequelize.Model {}

Order_details.init(
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
  { sequelize: db, modelName: "order_details" }
);

module.exports = Order_details;
