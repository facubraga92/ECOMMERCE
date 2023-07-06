import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const user = useSelector((state) => state.user);
  const [currentVariant, setCurrentVariant] = useState(0);
  const navigate = useNavigate();

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

  const handleEditClick = (productId) => {
    // Lógica para editar el producto
  };

  const handleDeleteClick = (productId) => {
    // Lógica para eliminar el producto
  };
  console.log(product);
  return (
    <div>
      <div className="bg-transparent p-6 rounded shadow-md">
        {product.products_variants.length > 0 &&
        product.products_variants[currentVariant] ? (
          <div onClick={() => handleProductClick(product.id)}>
            <img
              src={
                product.imgURL
                  ? product.imgURL[0]
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
        {user.role === "admin" && (
          <div>
            <Link to={`/admin/editproduct/${product.id}`}>
              <button className="text-gray-500 hover:text-gray-700 mr-2">
                📝
              </button>
            </Link>
            <button
              onClick={() => handleDeleteClick(product.id)}
              className="text-red-600 hover:text-red-800 mr-2"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
