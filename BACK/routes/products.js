const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  getSearchProduct,
} = require("../controllers/products");
const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.get("/:id", getSingleProduct);

productsRouter.get("/:name", getSearchProduct);

module.exports = productsRouter;
