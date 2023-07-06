import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const EditProduct = () => {
  const productId =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 1
    ];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgURLs, setImgURLs] = useState([]);
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    // Cargar los datos del producto al montar el componente
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/${productId}`
      );
      const productData = response.data;

      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setImgURLs(productData.imgURL);
      setVariants(productData.products_variants);
      console.log(productData);
    } catch (error) {
      console.log("Error al cargar los datos del producto:", error);
    }
  };

  const handleVariantChange = (index, field, value) => {
    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index][field] = value;
      return updatedVariants;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price,
      imgURL: imgURLs,
      variants,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/products/${productId}`,
        productData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(response.data);
      // Realizar alguna acción después de la edición exitosa
    } catch (error) {
      console.log("Error al editar el producto:", error);
    }
  };

  return (
    <div>
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            type="text"
            className="w-[50%] h-20 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>URL de Imagen:</label>
          {imgURLs &&
            imgURLs.map((imgURL, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={imgURL}
                  onChange={(e) =>
                    setImgURLs((prevImgURLs) => {
                      const updatedImgURLs = [...prevImgURLs];
                      updatedImgURLs[index] = e.target.value;
                      return updatedImgURLs;
                    })
                  }
                />
                {index === imgURLs.length - 1 && (
                  <button
                    onClick={() =>
                      setImgURLs((prevImgURLs) => [...prevImgURLs, ""])
                    }
                  >
                    Agregar URL
                  </button>
                )}
              </div>
            ))}
        </div>
        <div>
          <h3>Variantes</h3>
          {variants.map((variant, index) => (
            <div key={index}>
              <div>
                <label>Tamaño:</label>
                <input
                  type="text"
                  value={variant.size}
                  onChange={(e) =>
                    handleVariantChange(index, "size", e.target.value)
                  }
                />
              </div>
              <div>
                <label>Color:</label>
                <input
                  type="text"
                  value={variant.color}
                  onChange={(e) =>
                    handleVariantChange(index, "color", e.target.value)
                  }
                />
              </div>
              <div>
                <label>Stock:</label>
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) =>
                    handleVariantChange(index, "stock", e.target.value)
                  }
                />
              </div>
              <br />
            </div>
          ))}
          <button
            onClick={() =>
              setVariants((prevVariants) => [
                ...prevVariants,
                { size: "", color: "", stock: 0 },
              ])
            }
          >
            Agregar Variante
          </button>
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProduct;
