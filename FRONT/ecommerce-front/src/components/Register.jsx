import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Estilos
import "../styles/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/users/register", {
        name: name,
        password: password,
        email: email,
        address: address,
        phone: phone,
      })
      .then((res) => res.data)
      .then(() => navigate("/login"))

      .catch((error) => {
        console.log("Error registering", error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Creá tu cuenta</h1>
        <div className="email t-input">
          <input
            type="email"
            required=""
            id="email"
            placeholder="."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
          <div className="b-line"></div>
        </div>
        <div className="name t-input">
          <input
            type="text"
            placeholder="."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="name">Nombre</label>
          <div className="b-line"></div>
        </div>
        <div className="address t-input">
          <input
            type="text"
            placeholder="."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label htmlFor="address">Direccion</label>
          <div className="b-line"></div>
        </div>
        <div className="phone t-input">
          <input
            type="tel"
            placeholder="."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label htmlFor="phone">Telefono</label>
          <div className="b-line"></div>
        </div>
        <div className="not_account">
          <label>
            ¿Ya tienes una cuenta?{" "}
            <Link to={"/login"} className="login">
              Inicia sesión.
            </Link>
          </label>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
