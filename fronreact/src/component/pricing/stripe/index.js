import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51H6FnIA7XwVfgC5lYfwDCh8U1sXdGpSaKd2tSAyD5kdxz96ZqHkkIw6YgEizjyaQ6iOcqs6gMNm8fYjpNApkOT9000dqUmCtOV"
);

function Index() {
  const [coupon, setCoupon] = useState("");
  const [cou, setCou] = useState(false);

  return (
    <div className="striped">
      <p className="pgb bold">Enter your card details.</p>
      <p className="pgb bold">Your subscription will start now.</p>
      <p className="pgb bold">
        → Total due now<span className="ml-5 colorP">$99.00</span>
      </p>
      <p className="pgb bold">
        → Subscribing to<span className="ml-5 colorP">Test</span>
      </p>
      {!cou && (
        <button
          className="tHover font1 buttonT mu1"
          onClick={() => setCou(true)}
        >
          Have a coupon?
        </button>
      )}
      {cou && (
        <div className="md1 mu2">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            type="text"
            className="inputTT"
            placeholder="Coupon"
          />
          {coupon.length > 0 && (
            <button className="tHover font1 buttonT ml-5">Check coupon</button>
          )}
        </div>
      )}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Index;
