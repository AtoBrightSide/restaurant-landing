import { createContext, useReducer } from "react";

export const CartContext = createContext({
  cartItems: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const exists =
        state.cartItems.filter((item) => item.id === action.item.id).length > 0;
      if (exists) {
        const newCartItems = state.cartItems.map((item) =>
          item.id === action.item.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
        return { ...state, cartItems: newCartItems };
      } else {
        const newCartItem = { ...action.item, quantity: 1 };
        return { ...state, cartItems: [...state.cartItems, newCartItem] };
      }
    case "REMOVE_ITEM":
      let itemToBeRemoved = state.cartItems.find(
        (item) => item.id === action.id
      );
      if (itemToBeRemoved.quantity > 1) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.id),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    default:
      throw new Error("Wrong Action");
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, cartDispatch] = useReducer(CartReducer, {
    cartItems: [],
  });

  const addItem = (item) => {
    cartDispatch({
      type: "ADD_ITEM",
      item,
    });
  };

  const removeItem = (id) => {
    cartDispatch({
      type: "REMOVE_ITEM",
      id,
    });
  };

  const clearCart = () => {
    cartDispatch({
      type: "CLEAR_CART",
    });
  };

  const context = {
    cartItems: state.cartItems,
    addItem,
    removeItem,
    clearCart,
  };
  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
};
