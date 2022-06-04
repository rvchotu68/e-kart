import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Quantity,
  Arrow,
  Value,
  Price,
  RemoveButton,
} from "./checkout-item.styles.jsx";

import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action.js";
import { useDispatch } from "react-redux";

const CheckoutItem = ({ cartItem,cartItems }) => {
  const { name, price, imageUrl, qty } = cartItem;
  const dispatch = useDispatch();
  const clearCartItemHandler = () => dispatch(clearItemFromCart(cartItems,cartItem));
  const addItemToCartHandler = () => dispatch(addItemToCart(cartItems,cartItem));
  const removeItemFromCartHandler = () =>dispatch(removeItemFromCart(cartItems,cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={removeItemFromCartHandler}>&#10094;</Arrow>
        <Value>{qty}</Value>
        <Arrow onClick={addItemToCartHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>${price}</Price>
      <RemoveButton onClick={clearCartItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
