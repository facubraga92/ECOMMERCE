import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Estilos
import "../styles/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === repassword) {
      axios
        .post("http://localhost:3000/api/users/register", {
          name: name,
          password: password,
          email: email,
          address: address,
          phone: phone,
          code: code,
        })
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            alert(message);
            navigate("/login");
          } else {
            setErrorMessage(message);
          }
        })
        .catch((error) => {
          console.log("Error registering", error);
        });
    } else {
      setErrorMessage("Las contraseñas no coinciden");
    }
  };

  const handleCodeLinkClick = () => {
    setShowCodeInput(!showCodeInput);
    setCode("");
    setErrorMessage("");
  };

  return (
    <div className="container-register">
      <form onSubmit={handleSubmit}>
        <h1>Creá tu cuenta</h1>
        <div className="email t-input">
          <input
            type="email"
            required
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
            required
            id="password"
            placeholder="."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
          <div className="b-line"></div>
        </div>
        <div className="password t-input">
          <input
            type="password"
            required
            id="repassword"
            placeholder="."
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />
          <label htmlFor="repassword">Confirmar Contraseña</label>
          <div className="b-line"></div>
        </div>
        {password !== repassword && <p>Las contraseñas no coinciden</p>}
        <div className="name t-input">
          <input
            type="text"
            placeholder="."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="name">Nombre Completo</label>
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
          <label htmlFor="address">Dirección</label>
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
          <label htmlFor="phone">Teléfono</label>
          <div className="b-line"></div>
        </div>
        <div className="not_account">
          <label>
            ¿Ya tienes una cuenta?{" "}
            <Link to={"/login"} className="text-white cursor-default">
              Inicia sesión.
            </Link>
          </label>
          <br />
          <div className="mt-2">
            <label className="mt-4">
              ¿Tienes un código?{" "}
              <a
                className="text-white cursor-default"
                onClick={handleCodeLinkClick}
              >
                Ingresar código.
              </a>
            </label>
          </div>
          {showCodeInput && (
            <div className="code t-input">
              <input
                type="text"
                placeholder="."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <label htmlFor="code">Código</label>
              <div className="b-line"></div>
            </div>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
