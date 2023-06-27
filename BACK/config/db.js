const Sequelize = require('sequelize')

const db = new Sequelize("trashdb", 'facubraga92', '123456', {
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

module.exports = db
