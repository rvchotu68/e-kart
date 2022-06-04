import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";
import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../component/product-card/product-card.component";
import { useSelector } from "react-redux";
import { categoriesSelecter } from "../../store/categories/categories.selector.js";
import { cartItemsSelector } from "../../store/cart/cart.selector.js";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(categoriesSelecter);
  const [products, setProducts] = useState(categoriesMap[category]);
  const cartItems = useSelector( cartItemsSelector );
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} cartItems = {cartItems} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};
export default Category;
