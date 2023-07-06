const Categories = require("../models/Categories");
const Products = require("../models/Products");
const Products_variants = require("../models/Products_variants");

/**
 * Obtiene todos los productos con sus variantes.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON que contiene todos los productos con sus variantes.
 */

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

/**
 * Obtiene un producto individual con sus variantes.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 * @returns {Object} - Objeto JSON que contiene el producto individual con sus variantes.
 */

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

/**
 * Busca un producto por su nombre y obtiene sus variantes.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON que contiene el producto encontrado con sus variantes.
 */

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

/**
 * Obtiene todos los productos de una categoría con sus variantes.
 * 
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON que contiene todos los productos de la categoría con sus variantes.
 * @throws {Error} - Error al obtener los productos de la categoría.
 */

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
