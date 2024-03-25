import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "", // cart, checkout
  showCart: () => {},
  showCheckout: () => {},
  hideCart: () => {},
  hideCheckout: () => {},
});

export const UserProgressContextProvider = ({ children }) => {
    const [userProgress, setUserProgress] = useState("");

    const showCartHandler = () => {
        setUserProgress("cart");
    }

    const showCheckoutHandler = () => {
        setUserProgress("checkout");
    }

    const hideCartHandler = () => {
        setUserProgress("");
    }

    const hideCheckoutHandler = () => {
        setUserProgress("");
    }
    const userProgressCtx = {
        progress: userProgress,
        showCart: showCartHandler,
        showCheckout: showCheckoutHandler,
        hideCart: hideCartHandler,
        hideCheckout: hideCheckoutHandler,
    }
  return <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>;
};

export default UserProgressContext;
