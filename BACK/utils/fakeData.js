const { faker } = require("@faker-js/faker");
const Products = require("../models/Products");
const Products_variants = require("../models/Products_variants");
const Categories = require("../models/Categories");

// Genera datos falsos para la tabla products
const generateFakeProducts = () => {
  const products = [];
  const categoryIds = [1, 2, 3]; // IDs de las categorías existentes

  for (let i = 1; i <= 10; i++) {
    const product = {
      id: i,
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      price: faker.commerce.price(),
      categoryId: categoryIds[(i - 1) % categoryIds.length], // Alterna entre los IDs de categoría existentes
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

// Rellena la tabla Categories con las categorías por defecto
const fillDefaultCategories = async () => {
  try {
    const categories = [
      { id: 1, name: "remeras" },
      { id: 2, name: "hoodies" },
      { id: 3, name: "accesorios" },
    ];

    for (const category of categories) {
      await Categories.findOrCreate({ where: { id: category.id }, defaults: category });
    }

    console.log("Categorías creadas exitosamente.");
  } catch (error) {
    console.log("Error al crear las categorías:", error);
  }
};

// Rellena las tablas products y products_variants con los datos falsos
const fillFakeData = async () => {
  try {
    await fillDefaultCategories();
    await Products.bulkCreate(generateFakeProducts());
    await Products_variants.bulkCreate(generateFakeProductsVariants());
    console.log("Datos falsos creados exitosamente.");
  } catch (error) {
    console.log("Error al crear datos falsos:", error);
  }
};

module.exports = fillFakeData;
