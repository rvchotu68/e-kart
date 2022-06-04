import { createAction } from "../../utils/reducer/reducer.utils";
import { cartActionType } from "./cart.type";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, qty: cartItem.qty + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, qty: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if qty is equal to 1, if it is remove that item from the cart
  if (existingCartItem.qty === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced qty
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, qty: cartItem.qty - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  // updateCartItemsReducer(newCartItems,dispatch);
  return createAction(cartActionType.SET_CART_ITEMS,newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  // console.log(cartItems);
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  // updateCartItemsReducer(newCartItems,dispatch);
  return createAction(cartActionType.SET_CART_ITEMS,newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  // updateCartItemsReducer(newCartItems,dispatch);
  return createAction(cartActionType.SET_CART_ITEMS,newCartItems);
};

export const setCartItemsAction = (cartItems) =>
  createAction(cartActionType.SET_CART_ITEMS, cartItems);
export const setIsCartActive = (isCartActive) =>
  createAction(cartActionType.SET_IS_CART_OPEN, isCartActive);
