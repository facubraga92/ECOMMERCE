const Users = require("../models/Users");
const Cart = require("../models/Cart");
const Cart_item = require("../models/Cart_item");
const Products_variants = require("../models/Products_variants");
const Products = require("../models/Products");
const nodemailer = require("nodemailer");
const { transporter, sendMail } = require("../utils/mailService");

/**
 * Agrega un artículo al carrito.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON que indica si se agregó el artículo al carrito correctamente.
 */

const addItem = async (req, res) => {
  try {
    const { email, productsVariantId, quantity } = req.body;

    // Buscar el usuario por su email
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar un carrito con order_status "pay_pending" para el usuario
    let cart = await Cart.findOne({
      where: {
        userId: user.id,
        order_status: "pay_pending",
      },
    });

    // Si no existe un carrito con order_status "pay_pending", crear uno nuevo
    if (!cart) {
      cart = await Cart.create({
        userId: user.id,
        order_status: "pay_pending",
      });
    }

    // Verificar si el productsVariantId ya se encuentra en el carrito
    const existingCartItem = await Cart_item.findOne({
      where: {
        cartId: cart.id,
        productsVariantId,
      },
    });

    if (existingCartItem) {
      return res.status(400).json({
        message: "El producto ya se encuentra agregado en el carrito",
      });
    }

    // Obtener la variante de producto y verificar el stock
    const productVariant = await Products_variants.findByPk(productsVariantId);

    if (!productVariant) {
      return res
        .status(404)
        .json({ message: "Variante de producto no encontrada" });
    }

    if (productVariant.stock < quantity) {
      return res.status(400).json({
        message: `No hay suficiente stock disponible,queda/n ${productVariant.stock} unidad/es del producto solicitado.`,
      });
    }

    // Crear el Cart_item y asociarlo al Cart y al Products_variants
    const cartItem = await Cart_item.create({
      quantity,
      cartId: cart.id,
      productsVariantId,
    });

    res.json({ message: "Item agregado al carrito exitosamente", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar el item al carrito" });
  }
};

/**
 * Elimina un artículo del carrito.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON que indica si se eliminó el artículo del carrito correctamente.
 */

const removeItem = async (req, res) => {
  try {
    const { email } = req.body;
    const itemId = req.params.itemId;

    // Buscar el usuario por su email
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar el carrito con order_status "pay_pending" para el usuario
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        order_status: "pay_pending",
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    // Buscar el Cart_item en el carrito por su itemId
    const cartItem = await Cart_item.findOne({
      where: {
        productsVariantId: itemId,
        cartId: cart.id,
      },
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Ítem del carrito no encontrado" });
    }

    // Eliminar el Cart_item
    await cartItem.destroy();

    res.json({ message: "Ítem eliminado del carrito exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el ítem del carrito" });
  }
};

/**
 * Actualiza la cantidad de un artículo en el carrito.
 *
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON que indica si se actualizó la cantidad del artículo correctamente.
 * @throws {Error} - Error al actualizar la cantidad del artículo.
 */

const updateQuantity = async (req, res) => {
  try {
    const { email, quantity } = req.body;
    const itemId = req.params.itemId;

    // Buscar el usuario por su email
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar el carrito con order_status "pay_pending" para el usuario
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        order_status: "pay_pending",
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    // Buscar el Cart_item en el carrito por su itemId
    const cartItem = await Cart_item.findOne({
      where: {
        productsVariantId: itemId,
        cartId: cart.id,
      },
    });

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Ítem del carrito no encontrado" });
    }

    // Obtener la variante de producto y verificar el stock
    const productVariant = await Products_variants.findByPk(
      cartItem.productsVariantId
    );

    if (!productVariant) {
      return res
        .status(404)
        .json({ message: "Variante de producto no encontrada" });
    }

    if (quantity > productVariant.stock) {
      return res.status(400).json({
        message: `No hay suficiente stock disponible, quedan ${productVariant.stock} unidades del producto solicitado.`,
      });
    }

    // Actualizar la cantidad del Cart_item
    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ message: "Cantidad del ítem actualizada exitosamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar la cantidad del ítem" });
  }
};

/**
 * Obtiene todos los artículos del carrito.
 *
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON con los artículos del carrito y el carrito actual.
 * @throws {Error} - Error al obtener los artículos del carrito.
 */

const getCartItems = async (req, res) => {
  try {
    const { email } = req.body;

    // Buscar el usuario por su email
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar el carrito con order_status "pay_pending" para el usuario
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        order_status: "pay_pending",
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    // Obtener todos los Cart_item del carrito y sus relaciones con Products_variants y Products
    const cartItems = await Cart_item.findAll({
      where: {
        cartId: cart.id,
      },
      include: [
        {
          model: Products_variants,
          include: [
            {
              model: Products,
              attributes: ["id", "name", "description", "price", "imgURL"],
            },
          ],
        },
      ],
    });

    res.json({ cartItems, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los ítems del carrito" });
  }
};

/**
 * Obtiene el historial de carritos de un usuario.
 *
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON con el historial de carritos del usuario.
 * @throws {Error} - Error al obtener el historial de carritos.
 */

const getCartHistory = async (req, res) => {
  try {
    const { email } = req.body;

    // Buscar el usuario por su email
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Buscar todos los carritos con order_status "in_process" o "sended" para el usuario
    const carts = await Cart.findAll({
      where: {
        userId: user.id,
        order_status: ["in_process", "sended"], // Filtrar por los estados deseados
      },
    });

    if (carts.length === 0) {
      return res.status(404).json({ message: "No se encontraron carritos" });
    }

    const cartItems = [];

    // Obtener los Cart_item de cada carrito y sus relaciones con Products_variants y Products
    for (const cart of carts) {
      const items = await Cart_item.findAll({
        where: {
          cartId: cart.id,
        },
        include: [
          {
            model: Products_variants,
            include: [
              {
                model: Products,
                attributes: ["id", "name", "description", "category"],
              },
            ],
          },
        ],
      });

      cartItems.push({
        cartId: cart.id,
        order_status: cart.order_status,
        amount: cart.amount,
        shipping_address: cart.shipping_address,
        items: items,
      });
    }

    res.json({ carts: cartItems });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los ítems del carrito" });
  }
};

/**
 * Actualiza el estado del pedido y el stock de los artículos de un carrito.
 *
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto JSON que indica si se actualizaron correctamente el estado del pedido y el stock de los artículos.
 * @throws {Error} - Error al actualizar el estado del pedido y el stock de los artículos.
 */

const updateCartOrderStatusAndStock = async (req, res) => {
  try {
    const { order_status, order_date, shipping_address } = req.body;
    const user = await Users.findOne({ where: { email: req.body.email } });

    // Buscar el carrito con order_status "pay_pending"
    const cart = await Cart.findOne({
      where: {
        order_status: "pay_pending",
      },
    });

    if (!cart) {
      return res.status(404).json({
        message: "Carrito no encontrado.",
      });
    }

    // Actualizar el order_status del carrito
    cart.order_status = order_status;
    cart.shipping_address = shipping_address;
    cart.order_date = order_date;

    await cart.save();

    // Obtener los cart_items asociados al carrito
    const cartItems = await Cart_item.findAll({
      where: { cartId: cart.id },
      include: [
        {
          model: Products_variants,
          include: [
            {
              model: Products,
              attributes: ["id", "name", "description", "price", "imgURL"],
            },
          ],
        },
      ],
    });

    // Actualizar el stock de los products_variants correspondientes
    for (const cartItem of cartItems) {
      const { productsVariantId, quantity } = cartItem;

      const productVariant = await Products_variants.findByPk(
        productsVariantId
      );

      if (!productVariant) {
        throw new Error("Variante de producto no encontrada");
      }

      // Actualizar el stock restando la cantidad del cartItem
      productVariant.stock -= quantity;

      // Guardar los cambios en el stock del product_variant
      await productVariant.save();
    }

    let productList = "";
    for (const cartItem of cartItems) {
      productList += `<tr>
                    <td style="padding: 0.5rem; border: 1px solid #ccc;">${cartItem.products_variant.product.name}</td>
                    <td style="padding: 0.5rem; border: 1px solid #ccc;">${cartItem.products_variant.product.description}</td>
                  </tr>`;
    }

    let mailOptions = {
      from: "logistica@trashtalk.com",
      to: user.email,
      subject: "Confirmación de compra",
      text: `Su compra en Trash Talk ha sido confirmada! Pronto recibirá su paquete ${user.name}!`,
      html: `<div style="max-width: 600px; margin: 0 auto; padding: 2rem; background-color: #f7fafc;">
    <h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem;">Su compra en Trash Talk ha sido confirmada! Pronto recibirá su paquete ${user.name}!</h1>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="padding: 0.5rem; border: 1px solid #ccc;">Nombre del producto</th>
          <th style="padding: 0.5rem; border: 1px solid #ccc;">Descripción</th>
        </tr>
      </thead>
      <tbody>
        ${productList}
      </tbody>
    </table>
  </div>`,
    };

    sendMail(mailOptions);

    res.json({
      message: `Se ha actualizado el order_status del carrito y el stock de los articulos correctamente.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar el order_status y el stock del carrito",
    });
  }
};

const adminOrderStatusChange = async (req, res) => {
  try {
    const { order_status, cartId } = req.body;

    const cart = await Cart.findOne({
      where: {
        id: cartId,
      },
    });

    if (!cart) {
      return res.status(404).json({
        message: "Carrito no encontrado.",
      });
    }

    // Actualizar el order_status del carrito
    cart.order_status = order_status;

    await cart.save();

    res.json({
      message: `Se ha actualizado el order_status del carrito y el stock de los articulos correctamente.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar el order_status del carrito",
    });
  }
};

module.exports = {
  addItem,
  removeItem,
  updateQuantity,
  getCartItems,
  getCartHistory,
  updateCartOrderStatusAndStock,
  adminOrderStatusChange,
};
