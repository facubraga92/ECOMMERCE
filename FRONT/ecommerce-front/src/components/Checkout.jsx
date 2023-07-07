import React, { useEffect, useState } from "react";
import "../styles/checkout.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Checkout() {
  const user = useSelector((state) => state.user);
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCVC] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

<<<<<<< HEAD
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
        console.error("Error al obtener los items del carrito");
      }
    };

    fetchCartItems();
  }, []);

  const handleSubmit = () => {
    const data = {
      email: user.email,
      order_status: "in_process",
    };

    axios
      .post("http://localhost:3000/api/cart/order-status", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    const input = event.target.value;

    if (input.length <= 16) {
      setCardNumber(input);
    }
  };

  const handleExpiryDateChange = (event) => {
    const input = event.target.value;

    if (/^\d{0,2}\/\d{0,2}$/.test(input)) {
      setExpiryDate(input);
    }
=======
  const showMenu = (flag) => {
    if (flag) {
      closeIcon.classNameList.toggle("hidden");
      openIcon.classNameList.toggle("hidden");
      dropdown.classNameList.toggle("hidden");
    } else {
      closeIcon.classNameList.toggle("hidden");
      openIcon.classNameList.toggle("hidden");
      dropdown.classNameList.toggle("hidden");
    }
  };

  const changeText = (country) => {
    text.innerHTML = country;
    closeIcon.classNameList.toggle("hidden");
    openIcon.classNameList.toggle("hidden");
    dropdown.classNameList.toggle("hidden");
>>>>>>> bugfix/cleaningCode
  };
  const handleCVCChange = (event) => {
    const input = event.target.value;

    if (input.length <= 3) {
      setCVC(input);
    }
  };

  const handleNameOnCardChange = (event) => {
    const input = event.target.value;

    setNameOnCard(input);
  };

  const handleAddressChange = (event) => {
    const input = event.target.value;

    setAddress(input);
  };

  const handlePostalCodeChange = (event) => {
    const input = event.target.value;

    setPostalCode(input);
  };

  const handleProvinceChange = (event) => {
    const input = event.target.value;

    setProvince(input);
  };

  useEffect(() => {
    if (
      cardNumber.length === 16 &&
      /^\d{0,2}\/\d{0,2}$/.test(expiryDate) &&
      cvc.length === 3 &&
      nameOnCard.trim() !== "" &&
      address.trim() !== "" &&
      postalCode.trim() !== "" &&
      province.trim() !== ""
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [cardNumber, expiryDate, cvc, nameOnCard, address, postalCode, province]);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <div>
        <h1 className="mt-8">Checkout</h1>
        <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-end items-center 2xl:mx-auto 2xl:container">
          <div className="flex flex-col justify-start items-start w-full space-y-9">
<<<<<<< HEAD
            <div class="flex justify-start flex-col items-start space-y-2 mr 20">
              <Link to={"/"}>
                <button class="flex flex-row items-center text-gray-600 dark:text-white hover:text-gray-500 space-x-1">
                  <svg
                    class="fill-stroke"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.91681 7H11.0835"
                      stroke="currentColor"
                      stroke-width="0.666667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.91681 7L5.25014 9.33333"
                      stroke="currentColor"
                      stroke-width="0.666667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.91681 7.00002L5.25014 4.66669"
                      stroke="currentColor"
                      stroke-width="0.666667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p class="text-sm leading-none">Back</p>
                </button>
              </Link>

              <p class="text-base leading-normal sm:leading-4 text-gray-600 dark:text-white"></p>
            </div>
            <div class="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
              <div class="p-8 bg-gray-100 dark:bg-gray-800 flex flex-col lg:w-full xl:w-3/5">
                <div class="flex flex-row justify-center items-center mt-6">
                  <hr class="border w-full" />
                  <p class="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600 dark:text-white">
                    Paga con tarjeta
=======
            <div className="flex justify-start flex-col items-start space-y-2">
              <button className="flex flex-row items-center text-gray-600 dark:text-white hover:text-gray-500 space-x-1">
                <svg
                  className="fill-stroke"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.91681 7H11.0835"
                    stroke="currentColor"
                    stroke-width="0.666667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.91681 7L5.25014 9.33333"
                    stroke="currentColor"
                    stroke-width="0.666667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.91681 7.00002L5.25014 4.66669"
                    stroke="currentColor"
                    stroke-width="0.666667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="text-sm leading-none">Back</p>
              </button>
              <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-gray-50">
                Checkout
              </p>
              <p className="text-base leading-normal sm:leading-4 text-gray-600 dark:text-white"></p>
            </div>
            <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
              <div className="p-8 bg-gray-100 dark:bg-gray-800 flex flex-col lg:w-full xl:w-3/5">
                <button className="border border-transparent hover:border-gray-300 bg-gray-900 dark:bg-white dark:hover:bg-gray-900 dark:hover:border-gray-900 dark:text-gray-900 dark:hover:text-white hover:bg-white text-white hover:text-gray-900 flex flex-row justify-center items-center space-x-2 py-4 rounded w-full">
                  <div>
                    <svg
                      className="fill-current"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.9099 4.27692C9.6499 4.27692 9.1174 4.87817 8.2399 4.87817C7.34021 4.87817 6.65396 4.28129 5.56208 4.28129C4.49333 4.28129 3.35365 4.93379 2.6299 6.04535C1.61365 7.61285 1.78615 10.565 3.43208 13.08C4.02083 13.9804 4.80708 14.99 5.83833 15.001H5.85708C6.75333 15.001 7.01958 14.4141 8.25302 14.4072H8.27177C9.48677 14.4072 9.73052 14.9975 10.623 14.9975H10.6418C11.673 14.9866 12.5015 13.8679 13.0902 12.971C13.514 12.326 13.6715 12.0022 13.9965 11.2725C11.6155 10.3688 11.233 6.99348 13.5877 5.69942C12.869 4.79942 11.859 4.27817 10.9068 4.27817L10.9099 4.27692Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10.6338 1C9.88379 1.05094 9.00879 1.52844 8.49629 2.15188C8.03129 2.71688 7.64879 3.555 7.79879 4.36781H7.85879C8.65754 4.36781 9.47504 3.88688 9.95254 3.27063C10.4125 2.68406 10.7613 1.85281 10.6338 1V1Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base leading-4">Pay</p>
                  </div>
                </button>
                <div className="flex flex-row justify-center items-center mt-6">
                  <hr className="border w-full" />
                  <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600 dark:text-white">
                    or pay with card
>>>>>>> bugfix/cleaningCode
                  </p>
                  <hr className="border w-full" />
                </div>
                <div className="mt-8">
                  <input
<<<<<<< HEAD
                    class="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-white-600"
=======
                    className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
>>>>>>> bugfix/cleaningCode
                    type="email"
                    name=""
                    id=""
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
<<<<<<< HEAD
                <label class="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                  Detalles de tarjeta
=======
                <label className="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                  Card details
>>>>>>> bugfix/cleaningCode
                </label>
                <div className="mt-2 flex-col">
                  <div>
                    <input
<<<<<<< HEAD
                      class="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-white-600"
                      type="text"
=======
                      className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="email"
>>>>>>> bugfix/cleaningCode
                      name=""
                      id=""
                      placeholder="0000 1234 6549 15151"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </div>
                  <div className="flex-row flex">
                    <input
<<<<<<< HEAD
                      class="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-white-600"
                      type="text"
=======
                      className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="email"
>>>>>>> bugfix/cleaningCode
                      name=""
                      id=""
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                    />
                    <input
<<<<<<< HEAD
                      class="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-white-600"
                      type="text"
=======
                      className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="email"
>>>>>>> bugfix/cleaningCode
                      name=""
                      id=""
                      placeholder="CVC"
                      value={cvc}
                      onChange={handleCVCChange}
                    />
                  </div>
                </div>
<<<<<<< HEAD
                <label class="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                  Nombre de la tarjeta
=======
                <label className="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                  Name on card
>>>>>>> bugfix/cleaningCode
                </label>
                <div className="mt-2 flex-col">
                  <div>
                    <input
<<<<<<< HEAD
                      class="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-white-600"
                      type="text"
=======
                      className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="email"
>>>>>>> bugfix/cleaningCode
                      name=""
                      id=""
                      placeholder="Name on card"
                      value={nameOnCard}
                      onChange={handleNameOnCardChange}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center mt-6">
                  <hr className="border w-full" />
                  <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600 dark:text-white">
                    Direccion de envio
                  </p>
                  <hr className="border w-full" />
                </div>{" "}
                <div className="mt-2 flex-col">
                  <div>
                    <input
<<<<<<< HEAD
                      class="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-white-600"
                      type="text"
=======
                      className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="email"
>>>>>>> bugfix/cleaningCode
                      name=""
                      id=""
                      placeholder="Direccion"
                      value={address}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="flex-row flex">
                    <input
<<<<<<< HEAD
                      class="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-white-600"
                      type="text"
=======
                      className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="email"
>>>>>>> bugfix/cleaningCode
                      name=""
                      id=""
                      placeholder="CPA"
                      value={postalCode}
                      onChange={handlePostalCodeChange}
                    />
                    <input
<<<<<<< HEAD
                      class="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-white-600"
                      type="text"
=======
                      className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="email"
>>>>>>> bugfix/cleaningCode
                      name=""
                      id=""
                      placeholder="Provincia"
                      value={province}
                      onChange={handleProvinceChange}
                    />
                  </div>
                </div>
<<<<<<< HEAD
                <button
                  onClick={handleSubmit}
                  disabled={isButtonDisabled}
                  class="mt-8 border border-transparent hover:border-gray-300 dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:hover:text-white dark:border-transparent bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full"
                >
=======
                <button className="mt-8 border border-transparent hover:border-gray-300 dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:hover:text-white dark:border-transparent bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
>>>>>>> bugfix/cleaningCode
                  <div>
                    <p className="text-base leading-4">Pay </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col ml-20 mr-20 bg-gray-50 w-full p-4 md:p-14">
              <div>
                <h1 className="text-2xl font-semibold leading-6 text-gray-800">
                  Order Summary
                </h1>
              </div>
              <div className="flex mt-7 flex-col items-end w-full space-y-6">
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg leading-4 text-gray-600">Total items</p>
                  <p className="text-lg font-semibold leading-4 text-gray-600">
                    {totalQuantity}
                  </p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg leading-4 text-gray-600">
                    Total Charges
                  </p>
                  <p className="text-lg font-semibold leading-4 text-gray-600">
                    {cart.amount}
                  </p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg leading-4 text-gray-600">
                    Gastos de envio
                  </p>
                  <p className="text-lg font-semibold leading-4 text-gray-600">
                    $0
                  </p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg leading-4 text-gray-600">Sub total </p>
                  <p className="text-lg font-semibold leading-4 text-gray-600">
                    {cart.amount}
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full items-center mt-32">
                <p className="text-xl font-semibold leading-4 text-gray-800">
                  Estimated Total
                </p>
                <p className="text-lg font-semibold leading-4 text-gray-800">
                  {cart.amount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
