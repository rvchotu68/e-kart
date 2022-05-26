import {CategoryItemContainer,CategoryBodyContainer,BackgroundImage} from "./category-item.styles"
import { useNavigate } from "react-router-dom";

const CategoryItem = (props) => {
  const { id, title, imageUrl,route } = props.category;
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);
  return (
    <CategoryItemContainer id={id} onClick={onNavigateHandler}>
      <BackgroundImage
        imageUrl = {imageUrl}
      />
      <CategoryBodyContainer>
        <h2>{title}</h2>
        <p>Shop now</p>
      </CategoryBodyContainer>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
