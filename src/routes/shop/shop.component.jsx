import "./shop.styles.scss";
import { ProductsContext } from "../../context/products.context";
import { useContext } from "react";
import ProductCard from "../../component/product-card/product-card.component";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className = "products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product = {product} /> ;
      })}
    </div>
  );
};

export default Shop;
