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
  const [newVariant, setNewVariant] = useState({
    size: "",
    color: "",
    stock: 0,
  });

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
      setImgURLs(productData.imgURL || []);

      // Transformar las variantes para que coincidan con la estructura esperada
      const transformedVariants = productData.products_variants.map(
        (variant) => ({
          id: variant.id,
          size: variant.size,
          color: variant.color,
          stock: variant.stock,
        })
      );
      console.log(productData.imgURL);
      setVariants(transformedVariants);
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

  const handleAddURL = () => {
    if (imgURLs[imgURLs.length - 1] !== "") {
      setImgURLs((prevImgURLs) => [...prevImgURLs, ""]);
    }
  };
  const handleRemoveURL = (index) => {
    setImgURLs((prevImgURLs) => {
      const updatedImgURLs = [...prevImgURLs];
      updatedImgURLs.splice(index, 1);
      return updatedImgURLs;
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
      alert('Producto actualizado correctamente.')
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
          {imgURLs.map((imgURL, index) => (
            <div key={index}>
              <input
                type="text"
                value={imgURL}
                onChange={(e) => {
                  const updatedImgURLs = [...imgURLs];
                  updatedImgURLs[index] = e.target.value;
                  setImgURLs(updatedImgURLs);
                }}
              />
              {imgURLs.length !== 0 && (
                <button type="button" onClick={() => handleRemoveURL(index)}>x</button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddURL}>Agregar URL</button>
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
            type="button"
            className="bg-red-600 hover:bg-red-700 mb-2"
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
        <button type="submit" className="bg-red-600 hover:bg-red-700">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
