import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userInitialState } from "../state/user.js";
import { useEffect } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

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
        <Link to='/' class="navbar-brand">TRASH TALK$$</Link>
        <ul class="navbar-links">
          {user.email ? (
            <>
              <Link to="http://amazon.com">
                <a className="text-5xl">🛒</a>
              </Link>
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
