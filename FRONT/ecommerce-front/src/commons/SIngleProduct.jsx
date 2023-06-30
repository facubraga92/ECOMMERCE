import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import TTLogo from "../assets/TT_logo.png";
import Navbar from "../commons/Navbar";
import "../styles/singleproduct.css";

const SingleProduct = () => {
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
      <div>
        {product ? (
          <div class="flex p-6 font-mono bg-white">
            <div class="flex-none w-48 mb-10 relative z-10 before:bg-black before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-teal-400">
              <img
                src={TTLogo}
                alt=""
                class="absolute z-10 inset-0 w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
            <form class="flex-auto pl-6 ">
              <div class="relative flex flex-wrap items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
                <h1 class="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
                  {product.name}
                </h1>
                <div class="relative text-lg text-white">{product.price}</div>
                <div class="relative uppercase text-teal-400 ml-3">
                  In stock
                </div>
              </div>
              <div class="flex items-baseline my-6">
                <div class="space-x-3 flex text-sm font-medium">
                  <label>
                    <input
                      class="sr-only peer"
                      name="size"
                      type="radio"
                      value="xs"
                      checked
                    />
                    <div class="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                      XS
                    </div>
                  </label>
                  <label>
                    <input
                      class="sr-only peer"
                      name="size"
                      type="radio"
                      value="s"
                    />
                    <div class="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                      S
                    </div>
                  </label>
                  <label>
                    <input
                      class="sr-only peer"
                      name="size"
                      type="radio"
                      value="m"
                    />
                    <div class="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                      M
                    </div>
                  </label>
                  <label>
                    <input
                      class="sr-only peer"
                      name="size"
                      type="radio"
                      value="l"
                    />
                    <div class="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                      L
                    </div>
                  </label>
                  <label>
                    <input
                      class="sr-only peer"
                      name="size"
                      type="radio"
                      value="xl"
                    />
                    <div class="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                      XL
                    </div>
                  </label>
                </div>
              </div>
              <div class="flex space-x-2 mb-4 text-sm font-medium">
                <div class="flex space-x-4">
                  <button
                    class="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
                    type="submit"
                  >
                    Buy now
                  </button>
                  <button
                    class="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900"
                    type="button"
                  >
                    Add to bag
                  </button>
                </div>
                <button class="favorite-button" type="button" aria-label="Like">
                  <span class="heart"></span>
                </button>
              </div>
              <p class="text-xs leading-6 text-slate-500 ">
                Envio gratuito en todos los pedidos de Argentina
              </p>
            </form>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
