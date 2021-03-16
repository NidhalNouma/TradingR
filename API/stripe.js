const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const Stripe = require("stripe");
const { setSubscription, setCustomerId } = require("../Model/user");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SEC_KEY);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/create-checkout-session", async (req, res) => {
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url:
        "https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://example.com/canceled.html",
    });

    res.send({
      sessionId: session.id,
    });
  } catch (e) {
    res.status(400);
    return res.send({
      error: {
        message: e.message,
      },
    });
  }
});

router.post("/create-subscription", async function (req, res) {
  let { customerId, userId, email, price, paymentMethodId } = req.body;
  let subscription = null;
  const pr = process.env[price];
  if (!pr) return res.status(404).send({ error: "Invalid Price !!" });

  try {
    if (!customerId) {
      const customer = await createCustomer(email);
      customerId = customer.id;
      await setCustomerId(userId, customerId);
    }

    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // Change the default invoice settings on the customer to the new payment method
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create the subscription
    subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: pr }],
    });
    await setSubscription(userId, price);
  } catch (error) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `error with adding Subscription to user ${userId} ==> ${error}`
    );
    return res.status("402").send({ error: { message: error.message } });
  }

  res.json(subscription);
});

router.post("/update-subscription", async function (req, res) {
  const subscription = await stripe.subscriptions.update("sub_Ik4xf5hJtMryfb", {
    metadata: { order_id: "6735" },
  });
  res.json(subscription);
});

router.post("/cancel-subscription", async function (req, res) {
  const deleted = await stripe.subscriptions.del(req.body.subId);
  const cancel = await setSubscription(req.body.userId, "");
  res.json({ deleted, cancel });
});

router.post("/webhook", (request, response) => {
  const event = request.body;
  console.log(event);

  switch (event.type) {
    case "customer.subscription.deleted":
      const obj = event.data.object;
      console.log(obj);
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  response.send();
});

const createCustomer = async function (email) {
  const customer = await stripe.customers.create({ email });
  return customer;
};

const updateCustomer = async function (id, email) {
  const customer = await stripe.customers.update(id, { email });
  return customer;
};

module.exports = { stripe: router, createCustomer, updateCustomer };
