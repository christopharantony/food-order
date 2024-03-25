import React, { useContext } from "react";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../utils/format";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/CartContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const defaultData = null;

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    error,
    clearData,
    sendRequest,
    isLoading: isSending,
  } = useHttp("http://localhost:3000/orders", requestConfig, defaultData);

  const cartTotal = cartCtx.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handleCancel = () => userProgressCtx.hideCheckout();
  const handleFinalize = () => {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
    // userProgressCtx.hideCheckout();
  };

  let actions;

  if (isSending) {
    actions = <span>Sending order data...</span>;
  } else {
    actions = (
      <>
        <Button type="button" textOnly onClick={handleCancel}>
          Cancel
        </Button>
        <Button>Submit Order</Button>
      </>
    );
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleCancel}
      >
        <h2>Success</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via mail within the next few
          minutes.
        </p>
        <p className="modal-actions">
            <Button onClick={handleFinalize}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCancel}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit the data" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
