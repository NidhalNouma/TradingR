const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const model = require("../Model/model");
const user = require("../Model/user");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// middleware that is specific to this router
router.use(function (req, res, next) {
  model.connect();
  //   console.log("Time: ", Date.now());
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
      res.cookie("_SSD", rep.results.username, { maxAge: 300000 });
    }
    res.json(body);
    model.close();
  });
});

router.post("/find", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  user.findOne(email, password, function (rep) {
    const body = { response: rep };
    if (rep.findUser) {
      res.cookie("_SSD", rep.results.username, { maxAge: 30000 });
    }
    res.json(body);
    model.close();
  });
});

module.exports = router;
