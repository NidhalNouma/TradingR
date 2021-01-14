import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CheckoutSection";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(
      // need to change to client_secret after creating customer
      "pi_1I8YeHA7XwVfgC5lJgm9orIR_secret_yhIjhOiDpfOAiTiBnY6VBWNu4",
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Jenny Rosen",
          },
        },
      }
    );

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log(result);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe} className="buttonP pu-5 pd-5 pl2 pr2 mu1">
        Confirm order
      </button>
    </form>
  );
}
