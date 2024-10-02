import { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (pizza) => {
    const existingItem = cartItems.find((item) => item.id === pizza.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...pizza, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (pizzaId) => {
    const existingItem = cartItems.find((item) => item.id === pizzaId);
    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== pizzaId));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === pizzaId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, decreaseQuantity, calculateTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };