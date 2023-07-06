import React, { useState, useEffect } from "react";
import Navbar from "../commons/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addToCart } from "../state/cart";

//styles
import TTLogo from "../assets/TT_logo.png";
import "../styles/singleproduct.css";
import Cart from "./Cart";
import { setCartVisible } from "../state/cart";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  // implementando
  const visible=useSelector((state)=>state.cart.cartVisible)
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();


  //implementando
  const cartVisible = () => {
    dispatch(setCartVisible(!visible))
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

          console.log("Nuevo cart_item agregado:", response.data);

          dispatch(addToCart(response.data));
          cartVisible();
        } else {
          alert("Please select a size.");
        }
      } catch (error) {
        alert(JSON.stringify(error.response.data.message));
      }
    } else {
      alert("Inicia sesión para añadir items al carrito.");
    }
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  return (
    <>
      {product ? (
        <div className="flex p-6 font-mono bg-white">
          <div className="flex-none w-48 mb-10 relative z-10  before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-teal-400">
            <img
              src={TTLogo}
              alt=""
              className="absolute z-10 inset-0 w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          <form className="flex-auto pl-6 ">
            <div className="relative flex flex-wrap items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
              <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
                {product.name}
              </h1>
              <div className="relative text-lg text-white">{product.price}</div>
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
              </div>
            </div>
            <div className="flex space-x-2 mb-4 text-sm font-medium">
              <div className="flex space-x-4">
                <button
                  className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
                  type="submit"
                >
                  Buy now
                </button>
                <button
                  className="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900"
                  type="button"
                  onClick={handleAdd}
                >
                  {visible && <Cart />}
                  Add to bag
                </button>
              </div>
              <button
                className="favorite-button"
                type="button"
                aria-label="Like"
              >
                <span className="heart"></span>
              </button>
            </div>
            <p className="text-xs leading-6 text-slate-500 ">
              Envio gratuito en todos los pedidos de Argentina
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
