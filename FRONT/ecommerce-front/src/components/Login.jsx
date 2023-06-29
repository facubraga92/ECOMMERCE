import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((loginResponse) => {
        // Verificar el token después del inicio de sesión exitoso
        axios
          .get("http://localhost:3000/api/users/me", {
            withCredentials: true,
            credentials: "include",
          })
          .then((tokenVerifyResponse) => {
            dispatch(setUser(tokenVerifyResponse.data));

            alert(
              `Inicio de sesión exitoso: Bienvenido de regreso ${loginResponse.data.name} `
            );

            // Mover la navegación a la página principal aquí
            navigate("/");
          })
          .catch((error) => {
            if (error.response && error.response.status === 403) {
              // El token no es válido
              alert("El token no es válido. Inicia sesión nuevamente.");
            } else {
              alert(`Error en la verificación del token: ${error.message}`);
            }
          });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(error.response.data);
        } else {
          alert("Ocurrió un error al procesar la solicitud.");
        }
      });
  };

  return (
    <>
      <h2 className="login-title">Iniciar sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label" htmlFor="email">
          Nombre de usuario:
          <input
            className="login-input"
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label className="login-label" htmlFor="password">
          Contraseña:
          <input
            className="login-input"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button className="login-button" type="submit">
          Iniciar sesión
        </button>

        <p>
          Aun no tienes cuenta?
          <Link to={"/register"}> Registrate.</Link>
        </p>
      </form>
    </>
  );
};

export default Login;
