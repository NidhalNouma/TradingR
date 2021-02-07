import React, { useContext, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CheckoutSection";
import { createSubscription } from "../../Hooks/Stripe";
import { UserC } from "../../Hooks/User";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function CheckoutForm({ setDone, data }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user, check } = useContext(UserC);
  const [loading, setLoading] = useState(false);

  console.log(data);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (!user) {
      check(true);
      setLoading(false);
      return;
    }

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setLoading(false);
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: "testing",
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      const r = {
        userId: user._id,
        email: user.email,
        customerId: user.customerId,
        paymentMethodId: result.paymentMethod.id,
        price: data.ty === 0 ? data.data.id.m : data.data.id.y,
      };

      const conf = await createSubscription(r);
      console.log(conf);
      setDone(true);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button
        disabled={!stripe}
        className={loading ? "buttonP aclick" : "buttonP"}
      >
        {!loading ? (
          "Confirm"
        ) : (
          <CircularProgress size={25} style={{ color: "var(--scolor)" }} />
        )}
      </button>
    </form>
  );
}
