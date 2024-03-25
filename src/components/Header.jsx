import React, { useContext } from "react";
import Logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

const Header = () => {
  const cartCtx = useContext(CartContext);
  const useProjectCtx = useContext(UserProgressContext)

  const totalCartItems =
    cartCtx.items?.reduce((acc, item) => acc + item.quantity, 0);

    const handleShowCart = () => {
      useProjectCtx.showCart();
    }
  return (
    <header id="main-header">
      <div id="title">
        <img src={Logo} alt="A restaurant" />
        <h1>Food Order</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
};

export default Header;
