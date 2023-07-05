import React from "react";
import "../styles/categories.css";
import { Link } from "react-router-dom";

function Remeras() {
  const reme =
    "https://d2r9epyceweg5n.cloudfront.net/stores/002/128/995/products/prendas-corregidas-03-1f2da2c5d3280d03c016631093173616-1024-1024.png";
  const reme2 =
    "https://d2r9epyceweg5n.cloudfront.net/stores/002/128/995/products/prendas-corregidas_mesa-de-trabajo-11-03f7bb47d08daa4e9816630927104198-1024-1024.png";
  const reme3 =
    "https://d2r9epyceweg5n.cloudfront.net/stores/002/128/995/products/prendas-corregidas-071-ddb2510376c7dba40816630928071135-1024-1024.png";

  return (
    <div className="container">
      <div className="title">
        <h1>Remeras</h1>
      </div>

      <div className="products">
        <Link to={"/categories/"}>
          <div className="product">
            <img src={reme} alt="Remera 1" />
            <span>Remera 1</span>
          </div>
        </Link>
        <Link to={"/categories/"}>
          <div className="product">
            <img src={reme2} alt="Remera 2" />
            <span>Remera 2</span>
          </div>
        </Link>
        <Link to={"/categories/"}>
          <div className="product">
            <img src={reme3} alt="Remera 3" />
            <span>Remera 3</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Remeras;
