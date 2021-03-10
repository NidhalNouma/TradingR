import React, { useContext, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CheckoutSection";
import { createSubscription } from "../../Hooks/Stripe";
import { UserC } from "../../Hooks/User";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function CheckoutForm({ setDone, data, pm }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user, check, setUser } = useContext(UserC);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(
    user && user.paymentMethod.length > 0 ? false : true
  );

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (!user) {
      check(true);
      setLoading(false);
      return;
    }
    if (pm === null) {
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
        await pay(r, user, setUser, setDone);
      }
    } else {
      const r = {
        userId: user._id,
        email: user.email,
        customerId: user.customerId,
        paymentMethodId: pm,
        price: data.ty === 0 ? data.data.id.m : data.data.id.y,
      };
      await pay(r, user, setUser, setDone);
    }

    setLoading(false);
  };

  return (
    <>
      {show ? (
        <CardSection />
      ) : (
        <button className="buttonS" onClick={() => setShow(true)}>
          Add new card
        </button>
      )}
      <button
        onClick={handleSubmit}
        disabled={!stripe}
        className={loading ? "buttonP aclick" : "buttonP"}
      >
        {!loading ? (
          "Confirm"
        ) : (
          <CircularProgress size={25} style={{ color: "var(--scolor)" }} />
        )}
      </button>
    </>
  );
}

async function pay(r, user, setUser, setDone) {
  try {
    const conf = await createSubscription(r);
    if (conf.data) {
      const i = conf.data;
      const pr = process.env;
      let price = null;
      for (let v in pr) {
        if (pr[v] === i.plan.id) price = v.replace("REACT_APP_", "");
      }

      const sub = {
        price: price,
        interval: i.plan.interval,
        cycle: i.billing_cycle_anchor,
        start: i.current_period_start,
        end: i.current_period_end,
      };

      console.log(sub);
      setUser({ ...user, sub: [...user.sub, sub], subscription: price });
    }
    setDone(true);
  } catch (e) {
    console.log(e);
  }
}
