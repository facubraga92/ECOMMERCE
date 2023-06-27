const db = require("../config/db");
const Users = require("./Users");
const Products = require("./Products");
const Categories = require("./Categories");
const Products_variants = require("./Products_variants");
const Orders = require("./Orders");
const Order_details = require("./Order_details");

// Relación entre Users y Orders
Users.hasMany(Orders);
Orders.belongsTo(Users);

// Relación entre Products y Products_variants
Products.hasMany(Products_variants);
Products_variants.belongsTo(Products);

// Relación entre Products y Categories
Categories.hasMany(Products);
Products.belongsTo(Categories);

// Relación entre Orders y Order_details
Orders.hasMany(Order_details);
Order_details.belongsTo(Orders);

//Relacion entre Orders y Products_variants
Orders.hasMany(Products_variants);
Products_variants.belongsTo(Orders);

module.exports = db;
