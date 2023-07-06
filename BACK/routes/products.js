const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  getSearchProduct,
  getCategorie,
  deleteProduct,
  editProduct,
} = require("../controllers/products");
const isAdmin = require("../middlewares/isAdmin");
const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.get("/:id", getSingleProduct);

productsRouter.get("/:name", getSearchProduct);

productsRouter.get("/categories/:category", getCategorie);

productsRouter.delete("/:id", isAdmin, deleteProduct);

productsRouter.put("/:id", isAdmin, editProduct);

module.exports = productsRouter;
