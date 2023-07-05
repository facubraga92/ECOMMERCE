const Categories = require("../models/Categories");
const Products = require("../models/Products");
const Products_variants = require("../models/Products_variants");

const getAllProducts = (req, res) => {
  Products.findAll({
    include: {
      model: Products_variants,
      attributes: ["id", "size", "color", "stock"],
    },
    attributes: ["id", "name", "description", "price", "imgURL"],
  })
    .then((data) => res.status(200).send(data))
    .catch((err) => console.log(err));
};

const getSingleProduct = (req, res, next) => {
  const { id } = req.params;
  Products.findByPk(id, {
    include: {
      model: Products_variants,
      attributes: ["id", "size", "color", "stock"],
    },
  })
    .then((data) => {
      if (!data) {
        const error = new Error("Product was not found!");
        error.status = 404;
        throw error;
      }
      res.status(200).send(data);
    })
    .catch(next);
};

const getSearchProduct = (req, res) => {
  const { name } = req.params;

  Products.findOne(name, {
    where: {
      name: name,
    },
    include: {
      model: Products_variants,
      attributes: ["id", "size", "color", "stock"],
    },
  })
    .then((data) => {
      if (!data) {
        const error = new Error("Product was not found!");
        error.status = 404;
        throw error;
      }
      res.status(200).send(data);
    })
    .catch(next);
};

const getCategorie =  async (req, res) => {
  const category = req.params.category.toLowerCase();

  try {
    const categoryInstance = await Categories.findOne({
      where: { name: category },
    });

    if (!categoryInstance) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    const products = await Products.findAll({
      where: { categoryId: categoryInstance.id },
      include:[ { model: Categories, attributes: ["name"] 
    }, {
      model: Products_variants,
      attributes: ["id", "size", "color", "stock"],
    }],

    
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
module.exports = {
  getAllProducts,
  getSingleProduct,
  getSearchProduct,
  getCategorie,
};
