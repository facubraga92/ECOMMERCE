import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";

const ProductCard = ({ product }) => {
  const [currentVariant, setCurrentVariant] = useState(0);
  const navigate = useNavigate(); // Agrega esta línea para utilizar useNavigate

  const defaultImage = "/defaultImg.jpg";

  const changeVariant = (variantIndex) => {
    setCurrentVariant((prevVariant) => {
      const maxIndex = product.products_variants.length - 1;
      if (variantIndex < 0) {
        return 0;
      } else if (variantIndex > maxIndex) {
        return maxIndex;
      } else {
        return variantIndex;
      }
    });
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div>
      <div className="bg-white p-6 rounded shadow-md">
        {product.products_variants.length > 0 &&
        product.products_variants[currentVariant] ? (
          <div onClick={() => handleProductClick(product.id)}>
            <img
              src={
                product.products_variants[currentVariant].image
                  ? product.products_variants[currentVariant].image
                  : defaultImage
              }
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
          </div>
        ) : (
          <div onClick={() => handleProductClick(product.id)}>
            <img
              src={defaultImage}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
          </div>
        )}
        <h2
          onClick={() => handleProductClick(product.id)}
          className="text-xl text-black font-semibold mb-2"
        >
          {product.name}
        </h2>
        <p className="text-gray-700 mb-2">${product.price}</p>
        {product.products_variants.length > 0 &&
        product.products_variants[currentVariant] ? (
          <div>
            <p className="text-gray-700">
              Stock: {product.products_variants[currentVariant].stock}{" "}
              disponibles
            </p>
            <p className="text-gray-700">
              Talle: {product.products_variants[currentVariant].size}
            </p>
            {product.products_variants.length > 1 && (
              <div className="flex justify-between mt-4">
                <button
                  className="px-2 py-1 bg-gray-300 rounded-md"
                  disabled={currentVariant === 0}
                  onClick={() => changeVariant(currentVariant - 1)}
                >
                  &#8592; Anterior
                </button>
                <button
                  className="px-2 py-1 bg-gray-300 rounded-md"
                  disabled={
                    currentVariant === product.products_variants.length - 1
                  }
                  onClick={() => changeVariant(currentVariant + 1)}
                >
                  Siguiente &#8594;
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-700">No hay variantes disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
