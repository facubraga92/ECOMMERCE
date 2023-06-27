const { DataTypes, Model } = require("sequelize");
const sequelize = require("sequelize");

class Categories extends Model {}

Categories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "categories",
  }
);

module.exports = Categories;
