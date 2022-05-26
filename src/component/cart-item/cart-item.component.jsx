import {CartItemContainer,ItemDetails,Name,Price} from "./cart-item.styles.jsx";

const CartItem = ({ product }) => {
  const { price, name, imageUrl, qty } = product;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <Name>{name}</Name>
        <Price>
          {qty} X ${price}
        </Price>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
