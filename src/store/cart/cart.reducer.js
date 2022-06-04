import { cartActionType } from "./cart.type";

const INITIAL_STATE = {
  isCartActive: false,
  cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  console.log("inside cart reducer");
  console.log(type, payload);
  switch (type) {
    case cartActionType.SET_IS_CART_OPEN:
      return { ...state, isCartActive: payload };

    case cartActionType.SET_CART_ITEMS:
      return { ...state, cartItems: payload };

    default:
      return state;
  }
};
