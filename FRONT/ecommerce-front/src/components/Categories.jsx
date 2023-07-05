import React from "react";
import "../styles/categories.css";
import { Link } from "react-router-dom";

function Categories() {
  const gorra =
    "https://d2r9epyceweg5n.cloudfront.net/stores/002/128/995/products/prendas-corregidas-11-b39ba7dd07847ddf6216631112794734-1024-1024.png";
  const reme =
    "https://d2r9epyceweg5n.cloudfront.net/stores/002/128/995/products/prendas-corregidas-03-1f2da2c5d3280d03c016631093173616-1024-1024.png";
  const buzo =
    "https://d2r9epyceweg5n.cloudfront.net/stores/002/128/995/products/prendas-corregidas-091-0dbc9afd02ef011a8116630928575948-1024-1024.png";

  return (
    <div className="container">
      <div className="title">
        <h1>Nuestros Productos</h1>
      </div>

      <div className="products">
        <Link to={"/categories/1"}>
          <div className="product">
            <img src={gorra} alt="Gorras" />
            <span>Gorras</span>
          </div>
        </Link>
        <Link to={"/categories/2"}>
          <div className="product">
            <img src={reme} alt="Remeras" />
            <span>Remeras</span>
          </div>
        </Link>
        <Link to={"/categories/3"}>
          <div className="product">
            <img src={buzo} alt="Buzos" />
            <span>Buzos</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Categories;
