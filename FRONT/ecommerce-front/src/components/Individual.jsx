import React, { useState, useEffect } from "react";
import Navbar from "../commons/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const Detalles = () => {
  const [product, setProduct] = useState(null);
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container">
        {product ? (
          <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Detalles;
