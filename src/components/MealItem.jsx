import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import { Button } from "./ui/Button";
import { CartContext } from "../store/CartContext";

export const MealItem = (meal) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { id, name, image, description, price } = meal;

  const handleCartAction = () => {
    setCartItems((prevItems) => {
      if (prevItems.has(meal)) {
        let newCartItems = new Set([...prevItems]);
        newCartItems.delete(meal);
        return newCartItems;
      }
      return new Set([...prevItems, meal]);
    });
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
            {cartItems.has(meal) ? "Remove from cart" : "Add to cart"}
          </Button>
        </p>
      </article>
    </li>
  );
};
