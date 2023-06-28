const Sequelize = require("sequelize");
const db = require("../config/db.js");

class Orders extends Sequelize.Model {}

Orders.init(
  {
    id: {
      type: Sequelize.INTEGER,
      unique: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Date: {
      type: Sequelize.DATE,
    },
  },
  { sequelize: db, modelName: "orders" }
);

module.exports = Orders;
