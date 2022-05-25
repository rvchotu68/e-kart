import { clear } from "@testing-library/user-event/dist/clear";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isCartActive: false,
  setIsCartActive: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemsCount: 0,
  setCartItemsCount: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

const addCartItem = (cartItems, productToAdd) => {
  const existingProductItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingProductItem) {
    return cartItems.map((item) => {
      return item.id === existingProductItem.id
        ? { ...item, qty: item.qty + 1 }
        : item;
    });
  }

  return [...cartItems, { ...productToAdd, qty: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  //check if the productToRemove exists in the cartItems

  const existingProductItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  //if the qty of the product is 1 then remove the product from the cart list
  if (existingProductItem.qty === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  //return the cartItems with updated qty value.
  return cartItems.map((cartItem) => {
    return cartItem.id === productToRemove.id
      ? { ...productToRemove, qty: productToRemove.qty - 1 }
      : cartItem;
  });
};

const clearCartItem = (cartItems, productToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== productToClear.id);

const Cart = ({ children }) => {
  const [isCartActive, setIsCartActive] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState();
  const [cartTotal, setCartTotal] = useState(0);
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };

  const cartTotalValue = () => {
    setCartTotal(
      cartItems.reduce(
        (prevValue, currItem) => prevValue + currItem.qty * currItem.price,
        0
      )
    );
  };

  useEffect(() => {
    setCartItemsCount(
      cartItems.reduce((prev, currItem) => prev + currItem.qty, 0)
    );
    cartTotalValue();
  }, [cartItems]);

  useEffect(() => {
    cartTotalValue();
  }, [cartItems]);

  const value = {
    isCartActive,
    setIsCartActive,
    cartItems,
    addItemToCart,
    cartItemsCount,
    setCartItemsCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default Cart;
