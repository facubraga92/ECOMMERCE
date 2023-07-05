import React from "react";
import "../styles/categories.css";
import { Link } from "react-router-dom";

function Buzos() {
  const buzo =
    "https://d2r9epyceweg5n.cloudfront.net/stores/002/128/995/products/prendas-corregidas-091-0dbc9afd02ef011a8116630928575948-1024-1024.png";

  return (
    <div className="container">
      <div className="title">
        <h1>Buzos</h1>
      </div>

      <div className="products">
        <Link to={"/categories/"}>
          <div className="product">
            <img src={buzo} alt="Buzo 1" />
            <span>Buzo 1</span>
          </div>
        </Link>
        <Link to={"/categories/"}>
          <div className="product">
            <img src={buzo} alt="Buzo 2" />
            <span>Buzo 2</span>
          </div>
        </Link>
        <Link to={"/categories/"}>
          <div className="product">
            <img src={buzo} alt="Buzo 3" />
            <span>Buzo 3</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Buzos;
