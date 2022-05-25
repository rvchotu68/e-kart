import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isCartActive: false,
  setIsCartActive: () => {},
});

const Cart = ({ children }) => {
  const [isCartActive, setIsCartActive] = useState(false);

  const value = { isCartActive, setIsCartActive };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default Cart;