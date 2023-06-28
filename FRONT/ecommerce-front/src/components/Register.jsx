import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/* import videoBackground from "../Video/backvideo.mp4"; */

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
    <div className="register has-transparent-background">
      {/*       <video className="video-background" autoPlay loop muted>
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <div className="register-form">
        <h2>Crear una cuenta</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="address"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="phone"
            placeholder="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit">Register</button>
          <p className="p">
            Do you already have an account?
            <Link to={"/login"}> Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
