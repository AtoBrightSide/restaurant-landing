import { useContext } from "react";
import { Modal } from "./ui/Modal";
import { CartContext } from "../store/CartContext";

import { currencyFormatter } from "../util/formatting";
import { Button } from "./ui/Button";
import ModalProgressContext from "../store/ModalProgressContext";

export const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const { progress, hideCart } = useContext(ModalProgressContext);
  const cartTotal = cartItems.reduce(
    (total, currValue) => total + currValue.quantity * currValue.price,
    0
  );

  const handleCartClose = () => hideCart();

  return (
    <Modal className="cart" open={progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>

      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>

      <p className="modal-actions">
        <Button onClick={handleCartClose} textOnly>
          Close
        </Button>
        <Button onClick={handleCartClose}>Go to checkout</Button>
      </p>
    </Modal>
  );
};
