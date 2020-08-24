const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const model = require("../Model/model");
const user = require("../Model/user");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(function (req, res, next) {
  model.connect();
  res.on("finish", function () {
    model.close();
  });
  next();
});

router.post("/add", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  user.addnew(email, username, password, function (rep) {
    const body = {
      response: rep,
    };
    if (rep.add) {
      var expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      res.cookie("_SSD", JSON.stringify(rep.results), {
        Expires: expiryDate,
      });
    }
    res.json(body);
  });
});

router.post("/find", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  user.findOne(email, password, function (rep) {
    const body = { response: rep };
    if (rep.findUser) {
      var expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      const re = {
        id: rep.results.id,
        active: rep.results.active,
        username: rep.results.username,
        score: rep.results.score,
        joinAt: rep.results.joinAt,
        cardL: rep.results.card.length,
      };
      res.cookie("_SSD", JSON.stringify(re), {
        Expires: expiryDate,
      });
      // console.log(rep.results.card);
      // res.cookie("_SSDc", JSON.stringify(rep.results.card), {
      //   Expires: expiryDate,
      // });
    }
    res.json(body);
  });
});

router.post("/card/add", function (req, res) {
  const userId = req.body._id;
  const productId = req.body.productId;
  const productTitle = req.body.productTitle;
  const productDesc = req.body.productDesc;
  const productPrice = req.body.productPrice;
  const productImg = req.body.productImg;

  user.addToCard(
    userId,
    productId,
    productTitle,
    productDesc,
    productPrice,
    productImg,
    function (ans) {
      res.json(ans);
    }
  );
});

router.post("/product/add", function (req, res) {
  const userId = req.body._id;
  const productId = req.body.productId;
  const productType = req.body.productType;
  const productTitle = req.body.productTitle;
  const productDesc = req.body.productDesc;
  const productPrice = req.body.productPrice;
  const productImg = req.body.productImg;

  user.addToProduct(
    userId,
    productId,
    productType,
    productTitle,
    productDesc,
    productPrice,
    productImg,
    function (ans) {
      res.json(ans);
    }
  );
});

module.exports = router;
