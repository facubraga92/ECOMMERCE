import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";

//Estilos
import "../styles/login.css";

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
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Inicia sesión</h1>
          <div className="email t-input">
            <input
              type="email"
              required=""
              id="email"
              placeholder="."
              value={email}
              onChange={handleEmailChange}
            />
            <label htmlFor="email">Email</label>
            <div className="b-line"></div>
          </div>
          <div className="password t-input">
            <input
              type="password"
              required=""
              id="password"
              placeholder="."
              value={password}
              onChange={handlePasswordChange}
            />
            <label htmlFor="password">Contraseña</label>
            <div className="b-line"></div>
          </div>
          <div className="not_account">
            <label>
              ¿Aun no tienes cuenta?{" "}
              <Link to={"/register"} className="register">
                Registrate.
              </Link>
            </label>
          </div>
          <button>Entrar</button>
        </form>
      </div>
    </>
  );
};

export default Login;
