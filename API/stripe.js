const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const Stripe = require("stripe");
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

module.exports = router;
