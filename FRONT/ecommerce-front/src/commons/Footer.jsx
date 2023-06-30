import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "black", color: "white" }}>
      <div className="container">
        <p>&copy; {currentYear} Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
