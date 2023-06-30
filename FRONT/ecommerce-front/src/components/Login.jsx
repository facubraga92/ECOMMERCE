import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../state/user";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user=useSelector((state)=>state.user)  


  useEffect(()=>{
const data=localStorage.getItem('user')
if(data!==null)dispatch(setUser(JSON.parse(data)))
  },[])

 

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
            localStorage.setItem("user", JSON.stringify(tokenVerifyResponse.data))
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
       <div className="container h-screen flex items-center justify-center p-8">
        <form
          className="flex flex-col justify-between gap-2 min-h-500px min-w-500px bg-black p-4 rounded shadow"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-white font-light mb-4">Login</h1>
          <div className="t-input">
            <input
              type="email"
              required
              id="email"
              placeholder="."
              value={email}
              onChange={handleEmailChange}
              className="w-full min-h-40px text-white bg-transparent outline-none border-none text-sm font-light relative whitespace-0.5 caret-green"
            />
            <label
              htmlFor="email"
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-white transition duration-150 ${
                email ? "text-xs" : ""
              } ${email ? "-translate-y-180%" : ""}`}
            >
              Email
            </label>
            <div className="b-line"></div>
          </div>
          <div className="t-input">
            <input
              type="password"
              required
              id="password"
              placeholder="."
              value={password}
              onChange={handlePasswordChange}
              className="w-full min-h-40px text-white bg-transparent outline-none border-none text-sm font-light relative whitespace-0.5 caret-green"
            />
            <label
              htmlFor="password"
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-white transition duration-150 ${
                password ? "text-xs" : ""
              } ${password ? "-translate-y-180%" : ""}`}
            >
              Contraseña
            </label>
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
          <button className="self-end w-100px h-40px bg-transparent relative text-sm font-bold border-2 border-green text-white rounded-full z-1 animate-neon transition duration-300">
            Log in
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
