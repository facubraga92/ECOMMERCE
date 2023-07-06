const express = require("express");
const router = express.Router();
const productsRouter = require("./products");
const usersRouter = require("./users");
const cartRouter = require("./cart");
const categoriesRouter = require("./categories");
router.use("/products", productsRouter);
router.use("/users", usersRouter);
router.use("/cart", cartRouter);
router.use('/categories',categoriesRouter)
module.exports = router;
