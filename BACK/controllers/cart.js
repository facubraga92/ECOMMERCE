const Users = require("../models/Users");
const Cart = require("../models/Cart");
const Cart_item = require("../models/Cart_item");
const Products_variants = require("../models/Products_variants");
const Products = require("../models/Products");

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
              attributes: ["id", "name", "description"],
            },
          ],
        },
      ],
    });

    res.json({ cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los ítems del carrito" });
  }
};

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
                attributes: ["id", "name", "description","categoryId"],
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
    console.error(error);
    res.status(500).json({ message: "Error al obtener los ítems del carrito" });
  }
};

module.exports = {
  addItem,
  removeItem,
  updateQuantity,
  getCartItems,
  getCartHistory,
};
