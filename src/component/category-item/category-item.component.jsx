import "./category-item.styles.scss";

const CategoryItem = (props) => {
  const { id, title, imageUrl } = props.category;
  return (
    <div className="category-item" id={id}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
