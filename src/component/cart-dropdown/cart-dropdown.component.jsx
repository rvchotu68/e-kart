import {
  CartDropdownContainer,
  CartItems,
  ErrorMessage,
} from "./cart-dropdown.styles.jsx";
import Button ,{BUTTON_TYPE_CLASSES} from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {cartItemsSelector} from "../../store/cart/cart.selector";



const CartDropDown = () => {
  const  cartItems  = useSelector(cartItemsSelector);
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
