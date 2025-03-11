import { useContext } from "react";
import { Modal } from "./ui/Modal";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import ModalProgressContext from "../store/ModalProgressContext";
import { useActionState } from "react";
import useHttp from "../hooks/useHttp";
import { Error } from "./ui/Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
};

export const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { progress, hideCart } = useContext(ModalProgressContext);

  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );
  
  const totalAmount = cartItems.reduce(
    (total, curr) => total + curr.quantity * curr.price,
    0
  );

  const handleClose = () => hideCart();

  const handleFinish = () => {
    hideCart();
    clearCart();
    clearData();
  };

  const checkoutAction = async (prevState, formData) => {
    const customerData = Object.fromEntries(formData.entries());
    const requestBody = {
      order: {
        items: cartItems,
        customer: customerData,
      },
    };

    await sendRequest(JSON.stringify(requestBody));
  };

  const [formState, formAction, pending] = useActionState(checkoutAction, null);

  let buttonActions = (
    <>
      <Button textOnly type="button" onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (pending) {
    buttonActions = <span>Sending form data ...</span>;
  }
  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>You will receive an email confirming your order shortly</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={handleClose}>
      <h2>Checkout</h2>
      <p>Total Amount: {currencyFormatter.format(totalAmount)}</p>
      <form action={formAction}>
        <Input id="name" label="Full Name" type="text" />
        <Input id="email" label="Email Address" type="email" />
        <Input id="street" label="Street" type="text" />

        <div className="control-row">
          <Input id="postal-code" label="Postal Code" type="text" />
          <Input id="city" label="City" type="text" />
        </div>

        {error && (
          <Error title="Error submitting form" message={error.message} />
        )}

        <p className="modal-actions">{buttonActions}</p>
      </form>
    </Modal>
  );
};
