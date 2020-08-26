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

  // const ans = {
  //   add: false,
  //   results: null,
  //   errors: null,
  // };
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

router.post("/find", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const ans = {
    findUser: false,
    result: null,
    error: null,
  };

  const r = await user.findOne(email, password);
  if (r.res) {
    const re = {
      id: r.res.id,
      active: r.res.active,
      username: r.res.username,
      score: r.res.score,
      joinAt: r.res.joinAt,
      cardL: r.res.card.length,
    };
    var expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    res.cookie("_SSD", JSON.stringify(re), {
      Expires: expiryDate,
    });
    res.cookie("_SSDc", JSON.stringify(r.res.card), {
      Expires: expiryDate,
    });

    ans.findUser = true;
    ans.result = r.res;
    console.log("\x1b[35m%s\x1b[0m", "Find User ==> ", re.username);
  } else if (r.err) {
    ans.error = r.err;
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Cannot found user with email ${email} ... (email/password Incorrect)`
    );
  }

  res.json(ans);
});

router.post("/card/add", async function (req, res) {
  const userId = req.body._id;
  const productId = req.body.productId;
  const productTitle = req.body.productTitle;
  const productDesc = req.body.productDesc;
  const productPrice = req.body.productPrice;
  const productImg = req.body.productImg;

  const ans = {
    added: false,
    error: null,
  };
  const r = await user.addToCard(
    userId,
    productId,
    productTitle,
    productDesc,
    productPrice,
    productImg
  );
  if (r.res) {
    ans.added = true;
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Product_ID ${productId} Added To Card For User_ID ${userId} ...`
    );
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.post("/product/add", async function (req, res) {
  const userId = req.body._id;
  const productId = req.body.productId;
  const productType = req.body.productType;
  const productTitle = req.body.productTitle;
  const productDesc = req.body.productDesc;
  const productPrice = req.body.productPrice;
  const productImg = req.body.productImg;

  const ans = {
    added: false,
    error: null,
  };
  const r = await user.addToProduct(
    userId,
    productId,
    productType,
    productTitle,
    productDesc,
    productPrice,
    productImg
  );
  if (r.res) {
    ans.added = true;
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Product_ID ${productId} Added to User_ID ${userId} ...`
    );
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.get("/imprqa/:id", async function (req, res) {
  const userId = req.params.id;
  const ans = {
    find: false,
    result: null,
    errors: null,
  };

  const r = await user.getImprQa(userId);
  if (r.res) {
    ans.find = true;
    ans.result = {
      improvements: r.res.improvements,
      questions: r.res.questions,
    };
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Found Impro & Questions for user ID ${userId}  ...`
    );
  } else if (r.err) {
    ans.error = r.err;
  } else {
    ans.result = "User not fund";
    console.log(
      "\x1b[31m%s\x1b[0m",
      `User not found with this ID ${userId} ...`
    );
  }

  res.json(ans);
});

module.exports = router;
