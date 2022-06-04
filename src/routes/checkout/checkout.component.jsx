import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles.jsx";
import CheckoutItem from "../../component/checkout-item/checkout-item.component";
import { useSelector } from "react-redux";
import {
  cartItemsSelector,
  cartTotalSelector,
} from "../../store/cart/cart.selector.js";
const Checkout = () => {
  // const { cartItems, cartTotal } = useContext(CartContext);
  const cartItems = useSelector(cartItemsSelector);
  const cartTotal = useSelector(cartTotalSelector);
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => {
        return (
          <CheckoutItem
            key={cartItem.id}
            cartItem={cartItem}
            cartItems={cartItems}
          />
        );
      })}
      <Total>total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
