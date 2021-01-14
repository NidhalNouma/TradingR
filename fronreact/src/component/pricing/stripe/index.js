import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51H6FnIA7XwVfgC5lYfwDCh8U1sXdGpSaKd2tSAyD5kdxz96ZqHkkIw6YgEizjyaQ6iOcqs6gMNm8fYjpNApkOT9000dqUmCtOV"
);

function index() {
  return (
    <div className="pu1 pl4 pr4">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default index;
