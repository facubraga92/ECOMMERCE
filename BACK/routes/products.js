const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  getSearchProduct,
  getCategorie,
} = require("../controllers/products");
const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.get("/:id", getSingleProduct);

productsRouter.get("/:name", getSearchProduct);

productsRouter.get('/categories/:category',getCategorie);

module.exports = productsRouter;
