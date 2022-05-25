import "./cart-item.styles.scss";

const CartItem = ({ product }) => {
  const { price, name, imageUrl, qty } = product;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {qty} X ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
