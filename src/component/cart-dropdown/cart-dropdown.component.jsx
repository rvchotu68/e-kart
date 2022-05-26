import {
  CartDropdownContainer,
  CartItems,
  ErrorMessage,
} from "./cart-dropdown.styles.jsx";
import Button ,{BUTTON_TYPE_CLASSES} from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => {
            return <CartItem key={cartItem.id} product={cartItem} />;
          })
        ) : (
          <ErrorMessage>No products Added</ErrorMessage>
        )}
      </CartItems>
      <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={checkoutHandler}>
        Go To Checkout
      </Button>
    </CartDropdownContainer>
  );
};

export default CartDropDown;
