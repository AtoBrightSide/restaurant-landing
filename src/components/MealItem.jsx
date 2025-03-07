import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import { Button } from "./ui/Button";
import { CartContext } from "../store/CartContext";

export const MealItem = (meal) => {
  const { cartItems, addItem } = useContext(CartContext);
  const { id, name, image, description, price } = meal;
  const handleCartAction = () => {
    addItem(meal);
  };

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(price)}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleCartAction}>
            Add to cart
          </Button>
        </p>
      </article>
    </li>
  );
};
