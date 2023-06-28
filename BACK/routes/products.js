const express = require("express");
const { getAllProducts, getSingleProduct } = require("../controllers/products");
const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.get("/:id", getSingleProduct);

module.exports = productsRouter;
