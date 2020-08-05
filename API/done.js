const express = require("express");
const paytabs = require("paytabs_api");
var bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(function (req, res, next) {
  next();
});

router.post("/payment", function (req, res) {
  console.log(req.body);
  paytabs.createPayPage(
    {
      merchant_email: "nidhal.nouma.0@gmail.com",
      secret_key:
        "y07pVXcK4RYhutSz1xyZsULpeNOzCLeaMlzHjMsoDqF8TxHU5gUxaFWptLZ5xdgkzP2SCugfUWnOu5JAlD7vi4UMQURn77HGXJzz",
      currency: "USD", //change this to the required currency
      amount: req.body.price, //change this to the required amount
      site_url: "http://localhost:443", //change this to reflect your site
      title: "Order for EA", //Change this to reflect your order title
      quantity: 1, //Quantity of the product
      unit_price: req.body.price, //Quantity * price must be equal to amount
      products_per_title: "Shoes | Jeans", //Change this to your products
      return_url: "http://18.130.18.236/api/done/accept", //This should be your callback url
      cc_first_name: "Samy", //Customer First Name
      cc_last_name: "Saad", //Customer Last Name
      cc_phone_number: "00973", //Country code
      phone_number: "12332323", //Customer Phone
      billing_address: "Address", //Billing Address
      city: "Manama", //Billing City
      state: "Manama", //Billing State
      postal_code: "1234", //Postal Code
      country: "BHR", //Iso 3 country code
      email: "nidhal.nouma.1@gmail.com", //Customer Email
      ip_customer: "41.230.101.179", //Pass customer IP here
      ip_merchant: "http://192.168.1.13/", //Change this to your server IP
      address_shipping: "Shipping", //Shipping Address
      city_shipping: "Manama", //Shipping City
      state_shipping: "Manama", //Shipping State
      postal_code_shipping: "973",
      country_shipping: "BHR",
      other_charges: 0, //Other chargs can be here
      reference_no: 1234, //Pass the order id on your system for your reference
      msg_lang: "en", //The language for the response
      cms_with_version: "Nodejs Lib v1", //Feel free to change this
    },
    function (result) {
      if (result.response_code == 4012) {
        //Redirect your merchant to the payment link
        console.log("don", result.payment_url);
        res.redirect(result.payment_url);
      } else {
        //Handle the error
        console.log("err", result);
      }
    }
  );
});

router.post("/accept", function (req, res) {
  const pr = req.body.payment_reference;
  paytabs.verifyPayment(
    {
      merchant_email: "nidhal.nouma.0@gmail.com",
      secret_key:
        "y07pVXcK4RYhutSz1xyZsULpeNOzCLeaMlzHjMsoDqF8TxHU5gUxaFWptLZ5xdgkzP2SCugfUWnOu5JAlD7vi4UMQURn77HGXJzz",
      payment_reference: pr,
    },
    function (result) {
      console.log("vp", result);
      res.redirect("/strategys/1");
    }
  );
});

module.exports = router;
