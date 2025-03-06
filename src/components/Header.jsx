import { useContext } from "react";
import RestaurantLogo from "../assets/logo.jpg";
import { Button } from "./ui/Button";
import { CartContext } from "../store/CartContext";

export const Header = () => {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems);
  return (
    <header id="main-header">
      <div id="title">
        <img src={RestaurantLogo} alt="Restaurant name" />
        <h1>Something Cafe</h1>
      </div>
      <nav>
        <Button textOnly>Cart({cartItems.size})</Button>
      </nav>
    </header>
  );
};
