import { createContext, useReducer } from "react";
import { cartReducer } from "../reducers";
import { ADD_ITEM, REMOVE_ITEM } from "../actions/cartActions";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItemHandler(item) {
    dispatchCartAction({ type: ADD_ITEM, payload: item });
  }

  function removeItemHandler(id) {
    dispatchCartAction({ type: REMOVE_ITEM, payload: id });
  }

  function clearCartHandler() {
    dispatchCartAction({ type: "CLEAR" });
  }

  const cartContext = {
    items: cart.items,
    addItem: addItemHandler,
    clearCart: clearCartHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
