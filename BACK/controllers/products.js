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

const getCategorie = async (req, res) => {
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
      include: [
        { model: Categories, attributes: ["name"] },
        {
          model: Products_variants,
          attributes: ["id", "size", "color", "stock"],
        },
      ],
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Products.findByPk(id, {
      include: {
        model: Products_variants,
        attributes: ["id", "size", "color", "stock"],
      },
    });

    if (!product) {
      const error = new Error("Product was not found!");
      error.status = 404;
      throw error;
    }

    await product.destroy();

    res.status(200).send({
      success: true,
      message: "Producto eliminado correctamente.",
      productName: product.name,
    });
  } catch (error) {
    res.status(error.status || 500).send({
      success: false,
      message: error.message || "Hubo un error al eliminar el producto.",
    });
  }
};

const editProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, imgURL, variants } = req.body;

  try {
    // Editar el producto principal
    await Products.update(
      {
        name,
        description,
        price,
        imgURL,
      },
      {
        where: { id: productId },
      }
    );

    // Editar o crear las variantes
    for (const variant of variants) {
      const { id, size, color, stock } = variant;

      if (id) {
        // Si el id existe, actualizar la variante existente
        await Products_variants.update(
          { size, color, stock },
          { where: { id, productId } }
        );
      } else {
        // Si el id no existe, crear una nueva fila
        await Products_variants.create({ size, color, stock, productId });
      }
    }

    res.status(200).send({
      success: true,
      message: "Producto editado correctamente.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Hubo un error al editar el producto.",
    });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  getSearchProduct,
  getCategorie,
  deleteProduct,
  editProduct,
};
