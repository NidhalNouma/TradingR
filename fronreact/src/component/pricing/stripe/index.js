import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentItem from "./PaymentItem";

import CheckoutForm from "./CheckoutForm";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Index({ user, data, ty, setDone }) {
  // const [coupon, setCoupon] = useState("");
  // const [cou, setCou] = useState(false);
  const [pm, setPm] = useState(null);

  return (
    <div className="striped">
      <p className="pgb bold">Enter your card details.</p>
      <p className="pgb bold">Your subscription will start now.</p>
      <p className="pgb bold">Cancel any time.</p>
      <p className="pgb bold">
        → Total due now
        <span className="ml-5 colorP">
          ${ty === 0 ? data.pMonth.lPrice : data.pYear.lPrice} /
          {ty === 0 ? " Month" : " Year"}
        </span>
      </p>
      <p className="pgb bold">
        → Subscribing to<span className="ml-5 colorP">{data.title}</span>
      </p>
      <br />
      <p className="pgb bold">
        Get Access to:
        <ul className="mu-5">
          {data.desc.map((i, ii) => (
            <li key={ii}>{i}</li>
          ))}
        </ul>
      </p>
      {/* {!cou && (
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
      )} */}
      <br />

      {user &&
        user.paymentMethod &&
        user.paymentMethod.length > 0 &&
        user.paymentMethod.map((i, ii) => (
          <PaymentItem key={ii} i={i} pm={pm} set={setPm} />
        ))}

      <Elements stripe={stripePromise}>
        <CheckoutForm setDone={setDone} data={{ data, ty }} pm={pm} />
      </Elements>
    </div>
  );
}

export default Index;
