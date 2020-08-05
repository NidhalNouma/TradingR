const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");

const model = require("../Model/model");
const product = require("../Model/product");
const { addImpro, addImproAns, findProdByImproId } = require("../Model/impro");
const { addQuestion, addQuestionAns } = require("../Model/QandA");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// middleware that is specific to this router
router.use(function (req, res, next) {
  model.connect();
  //   console.log("Time: ", Date.now());
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

  addImpro(id, impro, function (ans) {
    res.json(ans);
  });
});

router.post("/add/impro/answer", function (req, res) {
  const id = req.body.id;
  const answer = req.body.answer;
  const userName = req.body.userName;

  addImproAns(id, userName, answer, function (ans) {
    res.json(ans);
  });
});

router.get("/find/impro", function (req, res) {
  const id = req.body.id;

  findProdByImproId(id, function (ans) {
    res.json(ans);
  });
});

router.post("/add/question", function (req, res) {
  const id = req.body.id;
  const question = req.body.question;

  addQuestion(id, question, function (ans) {
    res.json(ans);
  });
});

router.post("/add/question/answer", function (req, res) {
  const id = req.body.id;
  const answer = req.body.answer;
  const userName = req.body.userName;

  addQuestionAns(id, userName, answer, function (ans) {
    res.json(ans);
  });
});

module.exports = router;
