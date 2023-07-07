const Sequelize = require("sequelize");
const db = require("../config/db.js");
const Products_variants = require("./Products_variants.js");
const Products = require("./Products.js");
const Cart = require("./Cart.js");

class Cart_item extends Sequelize.Model {}

Cart_item.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "cart_item", timestamps: false }
);

const calculateCartAmount = async (cartId) => {
  const cartItems = await Cart_item.findAll({
    where: { cartId },
    include: {
      model: Products_variants,
      include: { model: Products },
    },
  });

  let totalAmount = 0;

  for (const cartItem of cartItems) {
    const { quantity, productsVariantId } = cartItem;

    const productVariant = await Products_variants.findByPk(productsVariantId);
    if (!productVariant) {
      throw new Error("Variante de producto no encontrada");
    }

    const product = await Products.findByPk(productVariant.productId);
    if (!product) {
      throw new Error("Producto no encontrado");
    }

    const itemAmount = parseFloat(product.price) * parseInt(quantity);
    totalAmount += itemAmount;
  }

  return totalAmount;
};

// Hook después de crear un cart_item
Cart_item.afterCreate(async (cartItem, options) => {
  try {
    const { cartId, productsVariantId, quantity } = cartItem;

    // Obtener la variante del producto
    const productVariant = await Products_variants.findByPk(productsVariantId);

    if (!productVariant) {
      throw new Error("Variante de producto no encontrada");
    }

    // Obtener el producto relacionado y su precio
    const product = await Products.findByPk(productVariant.productId);

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    // Calcular el monto para el cartItem
    const itemAmount = parseFloat(product.price) * parseInt(quantity);

    // Obtener el carrito correspondiente
    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    // Sumar el monto al valor actual del campo 'amount' en el carrito
    const updatedAmount = parseFloat(cart.amount) + itemAmount;

    // Actualizar el campo 'amount' en el carrito correspondiente
    await Cart.update({ amount: updatedAmount }, { where: { id: cartId } });
  } catch (error) {
    console.error(error);
  }
});

// Hook después de eliminar un cart_item
Cart_item.afterDestroy(async (cartItem, options) => {
  try {
    const { cartId } = cartItem;

    // Calcular el nuevo monto total del carrito después de eliminar el cart_item
    const updatedAmount = await calculateCartAmount(cartId);

    // Actualizar el campo 'amount' en el carrito correspondiente
    await Cart.update({ amount: updatedAmount }, { where: { id: cartId } });
  } catch (error) {
    console.error(error);
  }
});

// Hook después de actualizar un cart_item
Cart_item.afterUpdate(async (cartItem, options) => {
  try {
    const { cartId } = cartItem;

    // Calcular el nuevo monto total del carrito después de actualizar el cart_item
    const updatedAmount = await calculateCartAmount(cartId);

    // Actualizar el campo 'amount' en el carrito correspondiente
    await Cart.update({ amount: updatedAmount }, { where: { id: cartId } });
  } catch (error) {
    console.error(error);
  }
});

module.exports = Cart_item;
