import React from "react";
import axios from "axios";

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
        <a href="/" class="navbar-brand">
          TRASH TALK$$
        </a>
        <ul class="navbar-links">
          {user.name ? (
            <li>
              <a href="/login" class="navbar-link">
                Login
              </a>
            </li>
          ) : (
            <a href={handleLogout} class="navbar-link">
              logout
            </a>
          )}

          <li>
            <a href="/register" class="navbar-link">
              Register
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
