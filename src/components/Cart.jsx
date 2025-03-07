import { useContext } from "react";
import { Modal } from "./ui/Modal";
import { CartContext } from "../store/CartContext";

import { currencyFormatter } from "../util/formatting";
import { Button } from "./ui/Button";
import ModalProgressContext from "../store/ModalProgressContext";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const { cartItems, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(ModalProgressContext);
  const cartTotal = cartItems.reduce(
    (total, currValue) => total + currValue.quantity * currValue.price,
    0
  );

  const handleCartClose = () => hideCart();

  const handleGoToCheckout = () => showCheckout();

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleCartClose : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            addItem={addItem}
            removeItem={removeItem}
          />
        ))}
      </ul>

      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>

      <p className="modal-actions">
        <Button onClick={handleCartClose} textOnly>
          Close
        </Button>
        {cartItems.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
};
