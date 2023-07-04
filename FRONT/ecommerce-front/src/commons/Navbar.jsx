import React, { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userInitialState } from "../state/user.js";
import { useEffect } from "react";
import "../styles/navbar.css";
import Cart from "../commons/Cart.jsx";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/me", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      })
      .then((user) => {
        dispatch(setUser(user.data));
      })
      .catch((error) => {
        console.error("Error de servidor");
      });
  }, []);
  const handleLogout = () => {
    axios
      .get("http://localhost:3000/api/users/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      })
      .then((user) => {
        dispatch(setUser(userInitialState));
      });
  };

  const cartVisible = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <nav class="navbar">
      <div class="navbar-container">
        <Link to="/" class="navbar-brand">
          TRASH TALK$$
        </Link>
        <ul class="navbar-links">
          {user.email ? (
            <>
              <button className="cart-button-container" onClick={cartVisible}>
                {visible && <Cart />}
                🛒
              </button>

              <Link onClick={handleLogout} class="navbar-link">
                <li>Logout</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" class="navbar-link">
                <li>Login</li>
              </Link>
              <Link to="/register" class="navbar-link">
                <li>Register</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
