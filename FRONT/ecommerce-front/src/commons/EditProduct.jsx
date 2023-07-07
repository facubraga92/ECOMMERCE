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
      alert("Producto actualizado correctamente.");
      // Realizar alguna acción después de la edición exitosa
    } catch (error) {
      console.log("Error al editar el producto:", error);
    }
  };
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Descripción:</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded resize-none"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">URL de Imagen:</label>
          {imgURLs.map((imgURL, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={imgURL}
                onChange={(e) => {
                  const updatedImgURLs = [...imgURLs];
                  updatedImgURLs[index] = e.target.value;
                  setImgURLs(updatedImgURLs);
                }}
                className="flex-1 p-2 border border-gray-300 rounded mr-2"
              />
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveURL(index)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  x
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddURL}
            className="px-2 py-1 bg-green-600  hover:bg-green-700 text-white rounded"
          >
            Agregar URL
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Variantes</h3>
          {variants.map((variant, index) => (
            <div key={index} className="mb-4">
              <div className="mb-2">
                <label className="block mb-1">Tamaño:</label>
                <input
                  type="text"
                  value={variant.size}
                  onChange={(e) =>
                    handleVariantChange(index, "size", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Color:</label>
                <input
                  type="text"
                  value={variant.color}
                  onChange={(e) =>
                    handleVariantChange(index, "color", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Stock:</label>
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) =>
                    handleVariantChange(index, "stock", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="px-2 py-1 bg-red-600 hover:bg-red-700 mb-2 text-white rounded"
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
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
