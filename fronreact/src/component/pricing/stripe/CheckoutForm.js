import React, { useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CheckoutSection";
import { createSubscription } from "../../Hooks/Stripe";
import { UserC } from "../../Hooks/User";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { user, check } = useContext(UserC);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) check(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
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
        p: 1,
      };

      const conf = await createSubscription(r);
      console.log(conf);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe} className="buttonP">
        Confirm order
      </button>
    </form>
  );
}
