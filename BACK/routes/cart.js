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
<<<<<<< HEAD

cartRouter.post("/cart-history", getCartHistory);
=======
>>>>>>> 6e1a9a9159fbefff6e0b05af9bef51e1b4b450c2

module.exports = cartRouter;
