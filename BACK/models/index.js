const db = require("../config/db");
const Users = require("./Users");
const Products = require("./Products");
const Categories = require("./Categories");
const Products_variants = require("./Products_variants");
const Cart = require("./Cart");
const Cart_item = require("./Cart_item");

// Relación entre Users y Cart
Users.hasMany(Cart);
Cart.belongsTo(Users);

// Relación entre Products y Products_variants
Products.hasMany(Products_variants);
Products_variants.belongsTo(Products);

// Relación entre Products y Categories
Categories.hasMany(Products);
Products.belongsTo(Categories);

// Relación entre Orders y Order_details
Cart.hasMany(Cart_item);
Cart_item.belongsTo(Cart);

//Relacion entre Cart_item y Products_variants
Cart_item.belongsTo(Products_variants);
Products_variants.hasMany(Cart_item);

module.exports = db;
