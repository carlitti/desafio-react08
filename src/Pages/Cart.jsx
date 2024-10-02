import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { convertToCLPCurrency } from "../components/utils"; 
import "./Cart.css";

const Cart = () => {
  const { cartItems, addToCart, decreaseQuantity, calculateTotal } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const handleCheckout = async () => {
    if (!token) {
      setCheckoutMessage("Debes iniciar sesión para realizar la compra.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart: cartItems }),
      });

      if (response.ok) {
        setCheckoutMessage("Compra realizada con éxito.");
      } else {
        setCheckoutMessage("Error al realizar la compra.");
      }
    } catch (error) {
      setCheckoutMessage("Error al conectarse con el servidor.");
    }
  };

  return (
    <div className="container">
      <h2>Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <p>No hay pizzas en el carrito</p>
      ) : (
        <div className="cart-container">
          <ul>
            {cartItems.map((pizza) => (
              <li key={pizza.id} className="cart-item">
                <img src={pizza.img} alt={pizza.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <span className="cart-item-name">
                    {pizza.name} (x{pizza.quantity})
                  </span>
                  <span className="cart-item-price">
                    {convertToCLPCurrency(pizza.price * pizza.quantity)} CLP
                  </span>
                  <div className="cart-item-controls">
                    <button className="quantity-control" onClick={() => decreaseQuantity(pizza.id)}>
                      -
                    </button>
                    <button className="quantity-control" onClick={() => addToCart(pizza)}>
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: {convertToCLPCurrency(calculateTotal())} CLP</h3>
          <button className="checkout-button" onClick={handleCheckout} disabled={cartItems.length === 0}>
            {token ? "Pagar" : "Inicia sesión para pagar"}
          </button>
          {checkoutMessage && <p>{checkoutMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Cart;


