import RestaurantLogo from "../assets/logo.jpg";

export const Header = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src={RestaurantLogo} alt="Restaurant name" />
        <h1>Something Cafe</h1>
      </div>
      <nav>
        <button>Cart(0)</button>
      </nav>
    </header>
  );
};
