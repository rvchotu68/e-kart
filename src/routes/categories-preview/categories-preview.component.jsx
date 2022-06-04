import { Fragment } from "react";
import CategoryPreview from "../../component/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { categoriesSelecter } from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
  let categoriesMap = useSelector(categoriesSelecter);
  // categoriesMap = [];
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
