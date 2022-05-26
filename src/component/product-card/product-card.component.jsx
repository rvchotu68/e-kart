import {ProductCardContainer,Price,Name,Footer} from "./product-card.styles.jsx";
import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";
import { CartContext } from "../../context/cart.context";
import { useContext } from "react";

const ProductCard = ({ product }) => {
  const { price, name, imageUrl } = product;
  const {addItemToCart} = useContext(CartContext);

  const addProductToCart = () =>{
    addItemToCart(product)
  }

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={addProductToCart}>Add to cart</Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
