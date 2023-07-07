const express = require("express");

const {
  addItem,
  removeItem,
  updateQuantity,
  getCartItems,
  getCartHistory,
  updateCartOrderStatusAndStock,
  adminOrderStatusChange,
} = require("../controllers/cart");
const isAdmin = require("../middlewares/isAdmin");
const cartRouter = express.Router();

cartRouter.post("/add-item", addItem);

cartRouter.post("/remove-item/:itemId", removeItem);

cartRouter.post("/update-quantity/:itemId", updateQuantity);

cartRouter.post("/cart-items", getCartItems);

cartRouter.post("/cart-history", getCartHistory);

cartRouter.post("/order-status", updateCartOrderStatusAndStock);

cartRouter.post('/admin/order-status',isAdmin,adminOrderStatusChange)

module.exports = cartRouter;
