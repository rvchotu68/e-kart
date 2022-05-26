import {
  CartIconContainer,
  ShoppingIcon,
  ItemCount,
} from "./shopping-cart-icon.styles";

import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const ShoppingCartIcon = () => {
  const { isCartActive, setIsCartActive, cartItemsCount } =
    useContext(CartContext);

  const clickHandler = () => {
    setIsCartActive(!isCartActive);
  };

  return (
    <CartIconContainer onClick={clickHandler}>
      <ShoppingIcon />
      <ItemCount>{cartItemsCount}</ItemCount>
    </CartIconContainer>
  );
};

export default ShoppingCartIcon;
