const { faker } = require("@faker-js/faker");
const Products = require("../models/Products");
const Products_variants = require("../models/Products_variants");

// Genera datos falsos para la tabla products
const generateFakeProducts = () => {
  const products = [];

  for (let i = 1; i <= 10; i++) {
    const product = {
      id: i,
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      price: faker.commerce.price(),
      category: ["remeras", "hoodies", "accesorios"][
        Math.floor(Math.random() * 3)
      ],
    };
    products.push(product);
  }
  return products;
};

// Genera datos falsos para la tabla products_variants
const generateFakeProductsVariants = () => {
  const productsVariants = [];
  const productIds = Array.from({ length: 10 }, (_, index) => index + 1); // [1, 2, 3, ..., 10]

  for (let i = 1; i <= 10; i++) {
    const productVariant = {
      id: i,
      productId: productIds[Math.floor(Math.random() * productIds.length)], // Asocia cada variante a un producto existente (1-10)
      size: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)],
      color: "black", // Cambio aquí
      stock: Math.floor(Math.random() * 101), // Número aleatorio entre 0 y 100
    };
    productsVariants.push(productVariant);
  }
  return productsVariants;
};

// Rellena las tablas products y products_variants con los datos falsos
const fillFakeData = async () => {
  try {
    await Products.bulkCreate(generateFakeProducts());
    await Products_variants.bulkCreate(generateFakeProductsVariants());
    console.log("Datos falsos creados exitosamente.");
  } catch (error) {
    console.log("Error al crear datos falsos:", error);
  }
};

module.exports = fillFakeData;
