import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addToCart } from "../state/cart";

//styles
import "../styles/singleproduct.css";
import { setCartVisible } from "../state/cart";
import { message, Carousel } from "antd";
const defaultImage = "/defaultImg2.jpg";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const visible = useSelector((state) => state.cart.cartVisible);
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartVisible = () => {
    dispatch(setCartVisible(!visible));
  };

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

  useEffect(() => {
    if (product !== null && product.products_variants.length > 0) {
      setSelectedSize(product.products_variants[0]);
    }
  }, [product]);

  const handleAdd = async () => {
    if (user.email) {
      try {
        if (selectedSize) {
          const cartItem = {
            email: user.email,
            quantity: 1,
            productsVariantId: selectedSize.id,
          };

          const response = await axios.post(
            "http://localhost:3000/api/cart/add-item",
            cartItem
          );

          dispatch(addToCart(response.data));
          cartVisible();
        } else {
          message.warning("Por favor selecciona un talle.");
        }
      } catch (error) {
        message.error(JSON.stringify(error.response.data.message));
      }
    } else {
      message.error("Inicia sesión para añadir items al carrito.");
    }
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  return (
    <>
      {product ? (
        <div className="flex p-6 font-mono bg-white">
          <div className="flex-row w-48  mb-10 relative z-10  ">
            {/* <img
              src={product.imgURL?.[0] ? product.imgURL[0] : defaultImage}
              alt=""
              className="absolute z-10 inset-0 w-full h-full object-cover rounded-lg"
              loading="lazy"
            /> */}
            <div className="overflow-hidden rounded-lg bg-black ">
              {
                <Carousel autoplay>
                  {product.imgURL.map((img, index) => (
                    <div key={index}>
                      <img
                        src={img ? img : defaultImage}
                        alt=""
                        className="w-[192px] h-[290px] object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </Carousel>
              }
            </div>
          </div>
          <form className="flex-auto pl-6 ">
            <div className="relative flex flex-wrap items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
              <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
                {product.name}
              </h1>
              <div className="relative text-lg text-white mr-2">
                AR${product.price}
              </div>

              <div className="relative uppercase text-teal-400 ml-3">
                {selectedSize && selectedSize.stock !== 0
                  ? "In Stock"
                  : "Out of Stock"}
              </div>
            </div>
            <div className="flex items-baseline my-6">
              <div className="space-x-3 flex text-sm font-medium">
                {product.products_variants.map((item) => (
                  <label key={item.size}>
                    <input
                      className="sr-only peer"
                      name="size"
                      type="radio"
                      value={item.size}
                      checked={selectedSize === item}
                      onChange={() => handleSizeSelection(item)}
                    />
                    <div
                      className={`relative w-10 h-10 flex items-center justify-center text-black ${
                        selectedSize === item
                          ? "peer-checked:bg-black peer-checked:text-white"
                          : ""
                      } before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full ${
                        selectedSize === item
                          ? "peer-checked:before:bg-teal-400"
                          : ""
                      }`}
                    >
                      {item.size}
                    </div>
                  </label>
                ))}
                <p className="text-black">{product.description}</p>
              </div>
            </div>
            <div className="flex space-x-2 mb-4 text-sm font-medium">
              <div className="flex space-x-4">
                <button
                  className="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900"
                  type="button"
                  onClick={handleAdd}
                >
                  Añadir al Carrito
                </button>
              </div>
              <button
                className="favorite-button"
                type="button"
                aria-label="Like"
              ></button>
            </div>
            <p className="text-xs leading-6 text-slate-500 ">
              Envíos gratuitos si sos bootcamper de P5❤️.
            </p>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SingleProduct;
