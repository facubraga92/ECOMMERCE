import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CartHistory = () => {
  const [orderData, setOrderData] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/cart/cart-history", {
        email: user.email,
      })
      .then((res) => {
        setOrderData(res.data);
      });
  }, []);

  // Mueve la lógica de filtrado dentro del componente
  const completedOrders =
    orderData.carts?.filter((cart) => cart.order_status === "sended") || [];

  const inProcessOrders =
    orderData.carts?.filter((cart) => cart.order_status === "in_process") || [];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Historial de órdenes de compra
      </h2>

      {orderData.length === 0 ? (
        <p className="text-gray-600">Aún no posees historial de compras.</p>
      ) : (
        <>
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            En proceso de envío
          </h3>
          {inProcessOrders.map((cart) => (
            <div key={cart.cartId} className="mb-4 p-4 bg-gray-100 rounded-md">
              <p className="font-semibold text-gray-800">
                Carrito ID: {cart.cartId}
              </p>
              <p className="font-semibold text-gray-800">
                Monto: 💲{cart.amount}
              </p>
              <p className="font-semibold text-gray-800">
                📦Enviado a la dirección: {cart.shipping_address}
              </p>
              <ul className="list-disc ml-4">
                {cart.items.map((item) => (
                  <li key={item.id}>
                    <p className="text-gray-800">
                      Producto: {item.products_variant.product.name}
                    </p>
                    <p className="text-gray-800">
                      Talle: {item.products_variant.size}
                    </p>
                    <p className="text-gray-800">Cantidad: {item.quantity}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <h3 className="text-xl font-bold mb-2 text-gray-800">Completadas</h3>
          {completedOrders.map((cart) => (
            <div key={cart.cartId} className="mb-4 p-4 bg-gray-100 rounded-md">
              <p className="font-semibold text-gray-800">
                Carrito ID: {cart.cartId}
              </p>
              <p className="font-semibold text-gray-800">
                Monto: 💲{cart.amount}
              </p>
              <p className="font-semibold text-gray-800">
                📦Enviado a la dirección: {cart.shipping_address}
              </p>

              <ul className="list-disc ml-4">
                {cart.items.map((item) => (
                  <li key={item.id}>
                    <p className="text-gray-800">
                      Producto: {item.products_variant.product.name}
                    </p>
                    <p className="text-gray-800">
                      Talle: {item.products_variant.size}
                    </p>
                    <p className="text-gray-800">Cantidad: {item.quantity}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CartHistory;
