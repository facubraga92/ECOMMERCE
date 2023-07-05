import React from "react";
import "../styles/categories.css";

function Categories() {
  return (
    <div className="container">
      <h1>Nuestros Productos</h1>

      <div class="product">
        <img src="hat.jpg" alt="Gorras" />
        <span>Gorras</span>
      </div>
      <div class="product">
        <img src="tshirt.jpg" alt="Remeras" />
        <span>Remeras</span>
      </div>
      <div class="product">
        <img src="hoodie.jpg" alt="Buzos" />
        <span>Buzos</span>
      </div>
    </div>
  );
}

export default Categories;
