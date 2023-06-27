const Sequelize = require('sequelize')
const db = require('../config/db.js')
const bcrypt = require('bcrypt')

class Users extends Sequelize.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  async validatePassword(password) {
    return await this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

Users.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM("admin", "customer"),
      allowNull: false,
      defaultValue: "customer",
    },

    salt: {
      type: Sequelize.STRING,
    },
  },
  { sequelize: db, modelName: "users" }
);

Users.beforeCreate(async (user) => {
  const saltRounds = 8;

  try {
    if (typeof user.password !== "string") {
      throw new Error("Invalid password");
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (error) {
    console.error("Error:", error);
  }
});

module.exports = Users