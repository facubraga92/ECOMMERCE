import Sequelize from "sequelize";

const db = new Sequelize("trashdb", null, null, {
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

export default db;
