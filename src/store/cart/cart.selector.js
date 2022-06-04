import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const isCartActiveSelector = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartActive
);

export const cartItemsSelector = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const cartCountTotalSelector = createSelector(
  [cartItemsSelector],
  (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.qty, 0)
);

export const cartTotalSelector = createSelector(
  [cartItemsSelector],
  (cartItems) =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.qty * cartItem.price,
      0
    )
);
