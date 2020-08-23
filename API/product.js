const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");

const model = require("../Model/model");
const product = require("../Model/product");
const {
  addImpro,
  addImproAns,
  improPlus,
  improMin,
} = require("../Model/impro");

const { addQuestion, addQuestionAns } = require("../Model/QandA");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(function (req, res, next) {
  model.connect();
  res.on("finish", function () {
    model.close();
  });

  next();
});

router.get("/findbyid/:id", function (req, res) {
  const id = req.params.id;
  product.findId(id, function (ans) {
    res.json(ans);
  });
});

router.get("/findall", function (req, res) {
  product.findAll(function (ans) {
    res.json(ans);
  });
});

router.post("/add", function (req, res) {
  const type = req.body.type;
  const title = req.body.title;
  const description = req.body.description;
  const img = req.body.img;
  const media = req.body.media;
  const price = req.body.price;

  product.newProduct(type, title, description, media, img, price, function (
    ans
  ) {
    res.json(ans);
  });
});

router.post("/add/impro", function (req, res) {
  const id = req.body.id;
  const impro = req.body.impro;
  const userId = req.body.userId;
  const userName = req.body.userName;
  const userImg = req.body.userImg;

  addImpro(id, userId, userName, userImg, impro, function (ans) {
    res.json(ans);
  });
});

router.post("/add/impro/plus", function (req, res) {
  const _id = req.body.productId;
  const id = req.body.id;
  const userId = req.body.userId;
  const i = req.body.i;

  improPlus(_id, id, userId, i, function (ans) {
    res.json(ans);
  });
});

router.post("/add/impro/minus", function (req, res) {
  const id = req.body.id;
  const userId = req.body.userId;

  improMin(id, userId, function (ans) {
    res.json(ans);
  });
});

router.post("/add/impro/answer", function (req, res) {
  const id = req.body.id;
  const answer = req.body.answer;
  const userId = req.body.userId;
  const userName = req.body.userName;
  const userImg = req.body.userImg;

  addImproAns(id, userId, userName, userImg, answer, function (ans) {
    res.json(ans);
  });
});

router.post("/add/question", function (req, res) {
  const id = req.body.id;
  const userId = req.body.userId;
  const userName = req.body.userName;
  const userImg = req.body.userImg;
  const question = req.body.question;

  addQuestion(id, userId, userName, userImg, question, function (ans) {
    res.json(ans);
  });
});

router.post("/add/question/answer", function (req, res) {
  const id = req.body.id;
  const answer = req.body.answer;
  const userId = req.body.userId;
  const userName = req.body.userName;
  const userImg = req.body.userImg;

  addQuestionAns(id, userId, userName, userImg, answer, function (ans) {
    res.json(ans);
  });
});

module.exports = router;
