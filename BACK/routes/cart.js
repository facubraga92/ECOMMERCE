const express = require("express");

const {
  addItem,
  removeItem,
  updateQuantity,
  getCartItems,
} = require("../controllers/cart");
const cartRouter = express.Router();

cartRouter.post("/add-item", addItem);

cartRouter.post("/remove-item/:itemId", removeItem);

cartRouter.put("/update-quantity/:itemId", updateQuantity);

cartRouter.post("/cart-items", getCartItems);

module.exports = cartRouter;
