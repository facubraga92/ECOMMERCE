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
      <div className="bg-transparent p-6 rounded shadow-md">
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
              className="w-full h-48 object-cover mb-4 opacity-70 hover:opacity-100"
            />
          </div>
        ) : (
          <div onClick={() => handleProductClick(product.id)}>
            <img
              src={defaultImage}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 opacity-70 hover:opacity-100"
            />
          </div>
        )}
        <h2
          onClick={() => handleProductClick(product.id)}
          className="text-xl text-white font-semibold mb-2"
        >
          {product.name}
        </h2>
        <p className="text-white-700 mb-2">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
