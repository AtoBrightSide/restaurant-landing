import { createContext, useState } from "react";

const ModalProgressContext = createContext({
  progress: "",
  showCart: () => {},
  showCheckout: () => {},
  hideCart: () => {},
});

export const ModalProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState("");

  const handleShowCart = () => setProgress("cart");
  const handleShowCheckout = () => setProgress("checkout");
  const handleHideCart = () => setProgress("");

  const modalProgressCtx = {
    progress,
    showCart: handleShowCart,
    showCheckout: handleShowCheckout,
    hideCart: handleHideCart,
  };

  return (
    <ModalProgressContext.Provider value={modalProgressCtx}>
      {children}
    </ModalProgressContext.Provider>
  );
};

export default ModalProgressContext;
