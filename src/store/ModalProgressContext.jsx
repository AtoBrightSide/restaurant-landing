import { createContext, useState } from "react";

const ModalProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
});

export const ModalProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState("");

  const handleShowCart = () => setProgress("cart");
  const handleHideCart = () => setProgress("");

  const modalProgressCtx = {
    progress,
    showCart: handleShowCart,
    hideCart: handleHideCart,
  };

  return (
    <ModalProgressContext.Provider value={modalProgressCtx}>
      {children}
    </ModalProgressContext.Provider>
  );
};

export default ModalProgressContext;
