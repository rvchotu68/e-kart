import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles.jsx";
import ProductCard from "../product-card/product-card.component";
import { useSelector } from "react-redux";
import { cartItemsSelector } from "../../store/cart/cart.selector.js";

const CategoryPreview = ({ title, products }) => {
  const cartItems = useSelector(cartItemsSelector);
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cartItems={cartItems}
            />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
