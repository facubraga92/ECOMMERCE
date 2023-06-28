const Products = require("../models/Products");

const getAllProducts = (req, res) => {
  Products.findAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => console.log(err));
};

const getSingleProduct = (req, res, next) => {
  const { id } = req.params;
  Products.findByPk(id)
    .then((data) => {
      if (!data) {
        var error = new Error("product was not found!");
        error.status = 404;
        throw error;
      }
      res.status(200).send(article);
    })
    .catch(next);
};

module.exports = {
  getAllProducts,
  getSingleProduct,
};
