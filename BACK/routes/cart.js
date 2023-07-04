const express = require("express");

const {
  addItem,
  removeItem,
  updateQuantity,
  getCartItems,
  getCartHistory,
} = require("../controllers/cart");
const cartRouter = express.Router();

cartRouter.post("/add-item", addItem);

cartRouter.post("/remove-item/:itemId", removeItem);

cartRouter.post("/update-quantity/:itemId", updateQuantity);

cartRouter.post("/cart-items", getCartItems);

cartRouter.post("/cart-history", getCartHistory);

module.exports = cartRouter;
