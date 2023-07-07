import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserCarts = () => {
  const { id } = useParams();
  const [carts, setCarts] = useState([]);
  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCart, setSelectedCart] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/admin/info/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      })
      .then((response) => {
        setUser(response.data);
        refreshCarts();
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const email = user.email;

  useEffect(() => {
    if (user.length != 0) {
      axios
        .post(
          `http://localhost:3000/api/cart/cart-history`,
          { email },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            credentials: "include",
          }
        )
        .then((response) => {
          const sortedCarts = response.data.carts.sort(
            (a, b) => a.cartId - b.cartId
          );

          setCarts(sortedCarts);
        })
        .catch((error) => {});
    }
  }, [user]);

  const handleOrderStatusChange = (cartId, checked) => {
    const orderStatus = checked ? "sended" : "in_process";

    axios
      .post(
        "http://localhost:3000/api/cart/admin/order-status",
        { cartId, order_status: orderStatus },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        }
      )
      .then(() => {
        refreshCarts();
      });
  };

  const refreshCarts = () => {
    if (user.length != 0) {
      axios
        .post(
          `http://localhost:3000/api/cart/cart-history`,
          { email },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            credentials: "include",
          }
        )
        .then((response) => {
          const sortedCarts = response.data.carts.sort(
            (a, b) => a.cartId - b.cartId
          );
          setCarts(sortedCarts);
        })
        .catch((error) => {});
    }
  };

  const handleShowDetails = (cart) => {
    setSelectedCart(cart);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-10"
          onClick={handleCloseModal}
        >
          <div className="bg-white text-black rounded-lg p-6 shadow-lg">
            <ul>
              {selectedCart.items.map((item) => (
                <li key={item.id} className="py-2">
                  <p className="text-lg font-bold">
                    ✅ {item.products_variant.product.name}
                  </p>
                  <p>Size: {item.products_variant.size}</p>
                  <p>Quantity: {item.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">
        Carritos del Usuario - {user.name}
      </h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cart ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Monto
            </th>
            <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dirección de Envío
            </th>
            <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Enviado
            </th>
            <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Detalles del Pedido
            </th>
          </tr>
        </thead>
        <tbody className="bg-white text-black divide-y divide-gray-200">
          {carts.map((cart) => (
            <tr key={cart.cartId}>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {cart.cartId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                AR$ {cart.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {cart.shipping_address}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <input
                  type="checkbox"
                  checked={cart.order_status === "sended"}
                  onChange={(e) =>
                    handleOrderStatusChange(cart.cartId, e.target.checked)
                  }
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <ul>
                  {/* {cart.items.map((item) => (
                    <li key={item.id}>
                      <p>{item.products_variant.product.name}</p>
                      <p>Size: {item.products_variant.size}</p>
                      <p>Quantity: {item.quantity}</p>
                    </li>
                  ))} */}
                  <button
                    onClick={() => handleShowDetails(cart)}
                    className="text-blue-500 hover:text-blue-800"
                  >
                    📋
                  </button>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                  
                  </td> */}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCarts;
