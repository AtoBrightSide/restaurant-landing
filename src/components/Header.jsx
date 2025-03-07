import { useContext } from "react";
import RestaurantLogo from "../assets/logo.jpg";
import { Button } from "./ui/Button";
import { CartContext } from "../store/CartContext";
import ModalProgressContext from "../store/ModalProgressContext";

export const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { showCart } = useContext(ModalProgressContext);
  const totalItemsInCart = cartItems.reduce(
    (total, curr) => total + curr.quantity,
    0
  );

  const handleClick = () => {
    showCart();
  };

  return (
    <header id="main-header">
      <div id="title">
        <img src={RestaurantLogo} alt="Restaurant name" />
        <h1>Something Cafe</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleClick}>
          Cart({totalItemsInCart})
        </Button>
      </nav>
    </header>
  );
};
