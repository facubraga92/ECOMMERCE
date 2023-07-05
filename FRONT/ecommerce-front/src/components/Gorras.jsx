import React from "react";
import "../styles/categories.css";
import { Link } from "react-router-dom";

function Gorras() {
  const gorra =
    "https://d2r9epyceweg5n.cloudfront.net/stores/002/128/995/products/prendas-corregidas-11-b39ba7dd07847ddf6216631112794734-1024-1024.png";

  return (
    <div className="container">
      <div className="title">
        <h1>Gorras</h1>
      </div>

      <div className="products">
        <Link to={"/categories/"}>
          <div className="product">
            <img src={gorra} alt="Gorra 1" />
            <span>Gorra 1</span>
          </div>
        </Link>
        <Link to={"/categories/"}>
          <div className="product">
            <img src={gorra} alt="Gorra 2" />
            <span>Gorra 2</span>
          </div>
        </Link>
        <Link to={"/categories/"}>
          <div className="product">
            <img src={gorra} alt="Gorra 3" />
            <span>Gorra 3</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Gorras;
