const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const Stripe = require("stripe");
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
  const { customerId, email, p } = req.body;

  if (p > 2) {
    res.json({ error: "Invalid price" });
    return;
  }

  const price =
    p === 0
      ? process.env.STRIPE_PR_1
      : pr === 1
      ? process.env.STRIPE_PR_2
      : process.env.STRIPE_PR_3;

  if (!customerId) {
    const customer = await createCustomer(email);
    customerId = customer.id;
  }

  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: price }],
  });
  res.json(subscription);
});

router.post("/update-subscription", async function (req, res) {
  const subscription = await stripe.subscriptions.update("sub_Ik4xf5hJtMryfb", {
    metadata: { order_id: "6735" },
  });
  res.json(subscription);
});

router.post("/cancel-subscription", async function (req, res) {
  const deleted = await stripe.subscriptions.del("sub_Ik4xf5hJtMryfb");
  res.json(deleted);
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
