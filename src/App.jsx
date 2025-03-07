import { Cart } from "./components/Cart";
import { Checkout } from "./components/Checkout";
import { Header } from "./components/Header";
import { Meals } from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { ModalProgressProvider } from "./store/ModalProgressContext";

function App() {
  return (
    <ModalProgressProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </ModalProgressProvider>
  );
}

export default App;
