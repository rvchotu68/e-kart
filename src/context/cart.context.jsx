// import { createContext, useEffect, useReducer } from "react";

// export const CartContext = createContext({
//   isCartActive: false,
//   setIsCartActive: () => {},
//   cartItems: [],
//   addItemToCart: () => {},
//   cartItemsCount: 0,
//   removeItemFromCart: () => {},
//   clearItemFromCart: () => {},
//   cartTotal: 0,
// });

// const addCartItem = (cartItems, productToAdd) => {
//   const existingProductItem = cartItems.find(
//     (item) => item.id === productToAdd.id
//   );

//   if (existingProductItem) {
//     return cartItems.map((item) => {
//       return item.id === existingProductItem.id
//         ? { ...item, qty: item.qty + 1 }
//         : item;
//     });
//   }

//   return [...cartItems, { ...productToAdd, qty: 1 }];
// };

// const removeCartItem = (cartItems, productToRemove) => {
//   //check if the productToRemove exists in the cartItems

//   const existingProductItem = cartItems.find(
//     (cartItem) => cartItem.id === productToRemove.id
//   );

//   //if the qty of the product is 1 then remove the product from the cart list
//   if (existingProductItem.qty === 1) {
//     return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
//   }

//   //return the cartItems with updated qty value.
//   return cartItems.map((cartItem) => {
//     return cartItem.id === productToRemove.id
//       ? { ...productToRemove, qty: productToRemove.qty - 1 }
//       : cartItem;
//   });
// };

// const clearCartItem = (cartItems, productToClear) =>
//   cartItems.filter((cartItem) => cartItem.id !== productToClear.id);

// const initialValue = {
//   isCartActive: false,
//   cartItems: [],
//   cartItemsCount: 0,
//   cartTotal: 0,
// };

// export const actionType = {
//   isCartActive: "isCartActive",
//   addItemToCart: "addItemToCart",
//   removeCartItem: "removeCartItem",
//   clearItemFromCart: "clearItemFromCart",
//   cartItemsCount: "cartItemsCount",
//   cartTotal: "cartTotal",
// };

// const cartReducer = (state = initialValue, actionObj) => {
//   switch (actionObj.type) {
//     case actionType.isCartActive:
//       return { ...state, isCartActive: actionObj.payload };

//     case actionType.addItemToCart:
//       return {
//         ...state,
//         cartItems: addCartItem(
//           actionObj.payload.cartItems,
//           actionObj.payload.productToAdd
//         ),
//       };

//     case actionType.removeCartItem:
//       return {
//         ...state,
//         cartItems: removeCartItem(
//           actionObj.payload.cartItems,
//           actionObj.payload.productToRemove
//         ),
//       };
//     case actionType.clearItemFromCart:
//       return {
//         ...state,
//         cartItems: clearCartItem(
//           actionObj.payload.cartItems,
//           actionObj.payload.productToClear
//         ),
//       };
//     case actionType.cartItemsCount:
//       // console.log(actionObj);
//       return {
//         ...state,
//         cartItemsCount: actionObj.payload.reduce(
//           (prev, currItem) => prev + currItem.qty,
//           0
//         ),
//       };

//     case actionType.cartTotal:
//       return {
//         ...state,
//         cartTotal: actionObj.payload.reduce(
//           (prevValue, currItem) => prevValue + currItem.qty * currItem.price,
//           0
//         ),
//       };

//     default:
//       throw new Error("Error");
//   }
// };

// const Cart = ({ children }) => {
//   const [{ isCartActive, cartItems, cartItemsCount, cartTotal }, dispatch] =
//     useReducer(cartReducer, initialValue);

//   const addItemToCart = (productToAdd) => {
//     dispatch({
//       type: actionType.addItemToCart,
//       payload: { productToAdd, cartItems },
//     });
//   };

//   const removeItemFromCart = (productToRemove) => {
//     dispatch({
//       type: actionType.removeCartItem,
//       payload: { productToRemove, cartItems },
//     });
//   };

//   const clearItemFromCart = (productToClear) => {
//     dispatch({
//       type: actionType.clearItemFromCart,
//       payload: { productToClear, cartItems },
//     });
//   };

//   const setIsCartActive = (actionObj) => {
//     dispatch(actionObj);
//   };

//   const setCartTotal = () => {
//     dispatch({ type: actionType.cartTotal, payload: cartItems });
//   };

//   const setCartItemsCount = () => {
//     dispatch({ type: actionType.cartItemsCount, payload: cartItems });
//   };

//   useEffect(() => {
//     setCartItemsCount();
//     setCartTotal();
//   }, [cartItems]);

//   useEffect(() => {
//     setCartTotal();
//   }, [cartItems]);

//   const value = {
//     isCartActive,
//     setIsCartActive,
//     cartItems,
//     addItemToCart,
//     cartItemsCount,
//     removeItemFromCart,
//     clearItemFromCart,
//     cartTotal,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

// export default Cart;

import { createContext, useState, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

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

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const INITIAL_STATE = {
  isCartActive: false,
  cartItems: [],
  cartItemsCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartActive: false,
  setIsCartActive: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
  cartTotal: 0,
});

export const Cart = ({ children }) => {
  const [isCartActive, setIsCartActive] = useState(false);

  const [{ cartItemsCount, cartTotal, cartItems }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemsReducer = (cartItems) => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.qty,
      0
    );

    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.qty * cartItem.price,
      0
    );

    const payload = {
      cartItems,
      cartItemsCount: newCartCount,
      cartTotal: newCartTotal,
    };

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartActive,
    setIsCartActive,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartItemsCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export default Cart;