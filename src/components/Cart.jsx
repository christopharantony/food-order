import React, { useContext } from "react";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../utils/format";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handleCancel = () => userProgressCtx.hideCart();

  const handleCheckout = () => userProgressCtx.showCheckout();
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCancel : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onDecrement={() => cartCtx.removeItem(item.id)}
            onIncrement={() => cartCtx.addItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCancel}>
          Cancel
        </Button>
        {cartCtx.items?.length > 0 && (
          <Button onClick={handleCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
