import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../commons/ProductCard";

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.log("Error al obtener los productos:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setProducts((prevProducts) =>
      [...prevProducts].sort((a, b) => a.id - b.id)
    );
  }, []);

  return (
    <div>
      <h1 className="text-6xl mb-6">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
