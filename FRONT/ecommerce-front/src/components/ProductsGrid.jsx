import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../commons/ProductCard";
import Navbar from "../commons/Navbar";
import '../styles/ProductGrid.css'


const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://localhost:3000/api/products/";

        if (filteredCategory) {
          url = `http://localhost:3000/api/products/categories/${filteredCategory}`;
        }

        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.log("Error al obtener los productos:", error);
      }
    };
    fetchData();
  }, [filteredCategory]);

  useEffect(() => {
    setProducts((prevProducts) =>
      [...prevProducts].sort((a, b) => a.id - b.id)
    );
  }, []);

  const handleFilter = (category) => {
    setFilteredCategory(category);
  };

  return (
    <>
      <div >
        {/* <Navbar /> */}
        <h1 className="text-6xl mb-6 fontClass">Productos</h1>
        <div className="flex gap-2 mb-4 space-x-0.5 items-center justify-center ">
          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => handleFilter(null)}
          >
            Todos
          </button>
          <button
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => handleFilter("remeras")}
          >
            Remeras
          </button>
          <button
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => handleFilter("hoodies")}
          >
            Hoodies
          </button>
          <button
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => handleFilter("accesorios")}
          >
            Accesorios
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsGrid;




