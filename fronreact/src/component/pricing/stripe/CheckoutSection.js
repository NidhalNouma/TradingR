import React, { useContext } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { Dark } from "../../../app";

function CardSection() {
  const { dark } = useContext(Dark);
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: dark ? "#f4f2f0" : "#616e3c",
        fontFamily: '"Avenir", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        fontWeight: "bold",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div className="mu1">
      <h4 className="h41 bold">Card details</h4>

      <CardElement className="mu1" options={CARD_ELEMENT_OPTIONS} />
    </div>
  );
}

export default CardSection;