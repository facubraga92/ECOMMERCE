import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imgURLs, setImgURLs] = useState([""]);
  const navigate = useNavigate();

  const handleImgURLChange = (index, value) => {
    setImgURLs((prevImgURLs) => {
      const updatedImgURLs = [...prevImgURLs];
      updatedImgURLs[index] = value;
      return updatedImgURLs;
    });
  };

  const handleAddImgURL = () => {
    setImgURLs((prevImgURLs) => [...prevImgURLs, ""]);
  };

  const handleRemoveImgURL = (index) => {
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
      category,
      price,
      imgURLs,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/products",
        productData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        }
      );

      message.success("Producto creado correctamente.");
      navigate(`/admin/editproduct/${response.data.id}`);

      // Realizar alguna acción después de la creación exitosa
    } catch (error) {
      console.log("Error al crear el producto:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Agregar Producto</h2>
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
          <label className="block mb-2">Categoría:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Seleccionar categoría</option>
            <option value="remeras">Remeras</option>
            <option value="hoodies">Hoodies</option>
            <option value="accesorios">Accesorios</option>
          </select>
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
                onChange={(e) => handleImgURLChange(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded mr-2"
              />
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImgURL(index)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImgURL}
            className="px-2 py-1 bg-green-600  hover:bg-green-700 text-white rounded"
          >
            Agregar URL
          </button>
        </div>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
