const db = require("../config/db");
const Users = require("./Users");
const Products = require("./Products");
const Categories = require("./Categories");
const Products_variants = require("./Products_variants");
const Cart = require("./Cart");
const CartItem = require("./CartItem");

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
Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

//Relacion entre CartItem y Products_variants
CartItem.belongsTo(Products_variants);
Products_variants.hasMany(CartItem);

module.exports = db;
