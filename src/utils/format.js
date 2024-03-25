export const currencyFormatter = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(value);
