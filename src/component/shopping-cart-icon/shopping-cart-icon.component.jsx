import {
  CartIconContainer,
  ShoppingIcon,
  ItemCount,
} from "./shopping-cart-icon.styles";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsCartActive } from "../../store/cart/cart.action";
import { isCartActiveSelector,cartCountTotalSelector } from "../../store/cart/cart.selector";

const ShoppingCartIcon = () => {
  // const { isCartActive, setIsCartActive, cartItemsCount } = useContext(CartContext);
const dispatch = useDispatch();
  const isCartActive = useSelector(isCartActiveSelector);
  const cartItemsCount = useSelector(cartCountTotalSelector);
  const clickHandler = () => {
    dispatch(setIsCartActive(!isCartActive));
  };

  return (
    <CartIconContainer onClick={clickHandler}>
      <ShoppingIcon />
      <ItemCount>{cartItemsCount}</ItemCount>
    </CartIconContainer>
  );
};

export default ShoppingCartIcon;
