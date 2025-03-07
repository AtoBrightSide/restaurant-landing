import { useContext } from "react";
import { Modal } from "./ui/Modal";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import ModalProgressContext from "../store/ModalProgressContext";
import { useActionState } from "react";

const checkoutAction = (prevState, formData) => {
  const data = Object.fromEntries(formData.entries());
  console.log(data);
};

export const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const { progress, hideCart } = useContext(ModalProgressContext);

  const [formState, formAction] = useActionState(checkoutAction, );

  const totalAmount = cartItems.reduce(
    (total, curr) => total + curr.quantity * curr.price,
    0
  );

  const handleClose = () => hideCart();

  return (
    <Modal open={progress === "checkout"} onClose={handleClose}>
      <h2>Checkout</h2>
      <p>Total Amount: {currencyFormatter.format(totalAmount)}</p>
      <form action={formAction}>
        <Input id="full-name" label="Full Name" type="text" />
        <Input id="email" label="Email Address" type="email" />
        <Input id="street" label="Street" type="text" />

        <div className="control-row">
          <Input id="postal-code" label="Postal Code" type="text" />
          <Input id="city" label="City" type="text" />
        </div>

        <p className="modal-actions">
          <Button textOnly type="button" onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};
