const express = require("express");

const {
  addItem,
  removeItem,
  updateQuantity,
  getCartItems,
} = require("../controllers/cart");
const cartRouter = express.Router();

cartRouter.post("/add-item", addItem);

cartRouter.delete("/remove-item/:itemId", removeItem);

cartRouter.put("/update-quantity/:itemId", updateQuantity);

cartRouter.get("/cart-items", getCartItems);

module.exports = cartRouter;
