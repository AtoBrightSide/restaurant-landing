export const MealItem = (props) => {
  const { id, name, image, description, price } = props;
  return (
    <li key={id} className="meal-item">
      <article>
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <div className="meal-item-description">{description}</div>
        <div className="meal-item-price">{price}</div>
      </article>
    </li>
  );
};
