import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ product, onDeleteProduct }) => {
  const user = useSelector((state) => state.user);
  const [currentVariant, setCurrentVariant] = useState(0);
  const navigate = useNavigate();

  const defaultImage = "/defaultImg2.jpg";

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleDeleteClick = (productId) => {
    const confirmed = window.confirm(
      "¿Estás seguro de eliminar este artículo?"
    );

    if (confirmed) {
      onDeleteProduct(productId);
    }
  };

  return (
    <div>
      <div className="bg-transparent p-6 rounded shadow-md">
        <div onClick={() => handleProductClick(product.id)}>
          <img
            src={
              product.imgURL?.length !== 0 && product.imgURL?.[0] !== ""
                ? product.imgURL
                : defaultImage
            }
            alt={product.name}
            className="w-full h-48 object-contain mb-4 opacity-70 hover:opacity-100"
          />
        </div>

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
