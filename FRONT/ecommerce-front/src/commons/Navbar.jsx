import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userInitialState } from "../state/user.js";
import { useEffect } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

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

  return (
    <nav class="navbar">
      <div class="navbar-container">
        <a href="#" class="navbar-brand">
          TRASH TALK$$
        </a>
        <ul class="navbar-links">
          <li>
            <a href="/" class="navbar-link">
              Acerca de
            </a>
          </li>
          <li>
            <a href="/" class="navbar-link">
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

{
  /* <nav className="navbar has-transparent-background" role="navigation">
      <div>
        {user.email === null ? (
          <>
            <Link to="/register" className="button is-dark">
              REGISTER
            </Link>
            <Link to="/login" className="button is-dark">
              LOGIN
            </Link>
          </>
        ) : (
          <>
            <Link to="/products/all" className="button">
              PRODUCTS
            </Link>
            <Link to="/search" className="button">
              SEARCH
            </Link>
            <Link to="/faq" className="button">
              FAQ
            </Link>
            <Link to="/contact" className="button">
              CONTACT
            </Link>
            <button className="button is-danger" onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        )}
      </div>
    </nav> */
}
