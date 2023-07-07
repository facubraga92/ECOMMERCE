const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  getSearchProduct,
  getCategory,
  deleteProduct,
  editProduct,
  searchProducts,
  createProduct,
} = require("../controllers/products");
const isAdmin = require("../middlewares/isAdmin");
const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.get("/:id", getSingleProduct);

productsRouter.get("/:name", getSearchProduct);

productsRouter.get("/search/:name", searchProducts);

productsRouter.get("/categories/:category", getCategory);

productsRouter.delete("/:id", isAdmin, deleteProduct);

productsRouter.put("/:id", isAdmin, editProduct);

productsRouter.post("/", isAdmin, createProduct);

module.exports = productsRouter;
