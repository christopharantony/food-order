import React from "react";
import { currencyFormatter } from "../utils/format";

const CartItem = ({ name, price, quantity, onDecrement, onIncrement }) => {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrement}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrement}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
