import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCartVisible } from "../state/cart";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const user = useSelector((state) => state.user);
  const visible=useSelector((state)=>state.cart.cartVisible)
 const dispatch=useDispatch()
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/cart/cart-items",
          {
            email: user.email,
          }
        );

        const updatedCartItems = response.data.cartItems.map((item) => ({
          ...item,
        }));

        setCartItems(updatedCartItems);
        setCart(response.data.cart);
      } catch (error) {
        console.error("Error al obtener los items del carrito", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      await axios.post(
        `http://localhost:3000/api/cart/remove-item/${itemId}`,

        {
          email: user.email,
        }
      );

      const response = await axios.post(
        "http://localhost:3000/api/cart/cart-items",

        {
          email: user.email,
        }
      );
      setCartItems(response.data.cartItems);
      setCart(response.data.cart);
    } catch (error) {
      console.error("Error al eliminar el elemento del carrito", error);
    }
  };

  const handleUpdateQuantity = async (productVariantId, newQuantity) => {
    try {
      const updatedCartItems = cartItems.map((item) => {
        if (item.products_variant.id === productVariantId) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });

      const response = await axios.post(
        `http://localhost:3000/api/cart/update-quantity/${productVariantId}`,
        {
          email: user.email,
          quantity: newQuantity,
        }
      );

      setCartItems(updatedCartItems);

      let totalAmount = 0;
      updatedCartItems.forEach((item) => {
        totalAmount += item.products_variant.product.price * item.quantity;
      });
      setCart((prevCart) => ({ ...prevCart, amount: totalAmount }));
    } catch (error) {
      console.error(
        "Error al actualizar la cantidad del producto en el carrito",
        error
      );
    }
  };
  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={()=>dispatch(setCartVisible(false))}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => dispatch(setCartVisible(false))}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems?.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={
                                      item.products_variant.product.imgURL?.[0]
                                    }
                                    alt={item.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link
                                          to={`/products/${item.products_variant.product.id}`}
                                        >
                                          <a>
                                            {item.products_variant.product.name}
                                          </a>
                                        </Link>
                                      </h3>
                                      <p className="ml-4">
                                        {item.products_variant.product.price *
                                          item.quantity}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.products_variant.color}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Stock total{" "}
                                      {item.products_variant.stock -
                                        item.quantity}
                                    </p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() =>
                                          handleRemove(item.products_variant.id)
                                        }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex">
                                      <select
                                        className="text-white-600"
                                        value={item.quantity}
                                        onChange={(e) =>
                                          handleUpdateQuantity(
                                            item.products_variant.id,
                                            parseInt(e.target.value)
                                          )
                                        }
                                      >
                                        {[...Array(10)].map((_, index) => (
                                          <option
                                            key={index + 1}
                                            value={index + 1}
                                          >
                                            {index + 1}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{cart.amount}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => dispatch(setCartVisible(false))}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Cart;
