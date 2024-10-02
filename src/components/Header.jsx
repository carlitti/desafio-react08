import React from "react";
import "../header.css";

function Header() {
  return (
    <header className="header-banner">
      <div className="overlay">
        <h1>¡Pizzería Mamma Mia!</h1>
        <p>¡Tenemos las mejores pizzas que podrás encontrar!</p>
      </div>
    </header>
  );
}

export default Header;