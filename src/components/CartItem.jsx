import { currencyFormatter } from "../util/formatting";

export const CartItem = ({ item, addItem, removeItem }) => {
  const { id, name, price, quantity } = item;
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => removeItem(id)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => addItem(item)}>+</button>
      </p>
    </li>
  );
};
