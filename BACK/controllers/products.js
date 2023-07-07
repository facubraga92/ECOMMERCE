const { Sequelize } = require("sequelize");
const Cart_item = require("../models/Cart_item");
const Categories = require("../models/Categories");
const Products = require("../models/Products");
const Products_variants = require("../models/Products_variants");

/** Buscar Productos */
const searchProducts = async (req, res) => {
  const { name } = req.params;

  try {
    const products = await Products.findAll({
      where: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("name")),
        "LIKE",
        `%${name.toLowerCase()}%`
      ),
      include: {
        model: Products_variants,
        attributes: ["id", "size", "color", "stock"],
      },
      attributes: ["id", "name", "description", "price", "imgURL"],
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al buscar los productos",
    });
  }
};
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

const getCategory = async (req, res) => {
  const category = req.params.category.toLowerCase();

  try {
    const products = await Products.findAll({
      where: { category: category },
      include: [
        {
          model: Products_variants,
          attributes: ["id", "size", "color", "stock"],
        },
      ],
    });

    if (products.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.log("Error al obtener la categoría:", error);
    res.status(500).json({ error: "Hubo un error al obtener la categoría" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Buscar y eliminar los cart_items asociados a las variantes de productos del producto
    const productVariants = await Products_variants.findAll({
      where: { productId },
    });
    const variantIds = productVariants.map((variant) => variant.id);

    await Cart_item.destroy({ where: { productsVariantId: variantIds } });

    // Eliminar las variantes de productos asociadas al producto
    await Products_variants.destroy({ where: { productId } });

    // Eliminar el producto
    await Products.destroy({ where: { id: productId } });

    res.status(200).send({
      success: true,
      message: "Producto eliminado correctamente.",
      productId,
    });
  } catch (error) {
    res.status(error.status || 500).send({
      success: false,
      message: error.message || "Hubo un error al eliminar el producto.",
    });
  }
};

const deleteVariant = async (req, res) => {
  const variantId = req.params.id;

  try {
    await Products_variants.destroy({ where: { id: variantId } });
    res.status(200).send({
      success: true,
      message: "Variante eliminada correctamente.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Hubo un error al eliminar la variante.",
    });
  }
};

const editProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, imgURL,category, variants } = req.body;

  try {
    // Editar el producto principal
    await Products.update(
      {
        name,
        description,
        price,
        category,
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

const createProduct = async (req, res) => {
  const { name, description, category, price, imgURLs } = req.body;

  try {
    // Crear el producto principal
    const product = await Products.create({
      name,
      description,
      category,
      price,
      imgURL: imgURLs,
    });

    res.status(200).send({
      success: true,
      message: "Producto creado correctamente.",
      id: product.id,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Hubo un error al crear el producto.",
    });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  getSearchProduct,
  getCategory,
  deleteProduct,
  editProduct,
  createProduct,
  searchProducts,
  deleteVariant
};
