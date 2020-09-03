const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");

const user = require("../Model/user");
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

router.get("/findbyid/:id", async function (req, res) {
  const id = req.params.id;
  const ans = {
    find: false,
    result: null,
    error: null,
  };
  const r = await product.findId(id);
  if (r.res) {
    ans.find = true;
    ans.result = r.res;
    console.log("\x1b[35m%s\x1b[0m", `Product_ID ${id} Found ...`);
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.get("/findall", async function (req, res) {
  const ans = {
    find: false,
    results: null,
    error: null,
  };
  const r = await product.findAll();
  if (r.res) {
    ans.find = true;
    ans.results = r.res;
    console.log("\x1b[35m%s\x1b[0m", `All products found ...`);
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.post("/add", async function (req, res) {
  const type = req.body.type;
  const title = req.body.title;
  const description = req.body.description;
  const img = req.body.img;
  const media = req.body.media;
  const price = req.body.price;
  const ans = {
    added: false,
    error: null,
  };
  const r = await product.newProduct(
    type,
    title,
    description,
    media,
    img,
    price
  );
  if (r.res) {
    ans.added = true;
    console.log("\x1b[35m%s\x1b[0m", "New Product added ...");
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.post("/add/impro", async function (req, res) {
  const id = req.body.id;
  const userId = req.body.userId;
  const impro = req.body.impro;

  const ans = {
    added: false,
    improId: null,
    error: null,
  };

  const rsp = await addImpro(id, userId, impro);
  if (rsp.res) {
    const p = await product.findId(id);
    const raw = p.res.improvements[p.res.improvements.length - 1];
    console.log(
      "\x1b[35m%s\x1b[0m",
      `New Improvement with Id ${raw._id} Added for Product with ID ${id} ... `
    );
    ans.improId = raw._id;
    const urs = await user.addImpro(userId, id, raw._id);
    if (urs) {
      console.log(
        "\x1b[35m%s\x1b[0m",
        `Impro Added to User ${userId} Improvement_ID ${raw._id} ...`
      );
      ans.added = true;
    }
  } else {
    ans.error = rsp.err;
  }

  res.json(ans);
});

router.post("/add/impro/plus", async function (req, res) {
  const _id = req.body.productId;
  const id = req.body.id;
  const userId = req.body.userId;

  const ans = {
    added: false,
    error: null,
  };
  const r = await improPlus(_id, id, userId);
  if (r.res) {
    ans.added = true;
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Plus Added to improvementID ${id} for product ID ${_id} userID ${userId} ...`
    );
    const r1 = await user.addScore(userId, 1);
    if (r1.res) {
      console.log(
        "\x1b[35m%s\x1b[0m",
        `Plus Added to score for userID ${userId} ...`
      );
    }
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.post("/add/impro/minus", async function (req, res) {
  const _id = req.body.productId;
  const id = req.body.id;
  const userId = req.body.userId;

  const ans = {
    added: false,
    error: null,
  };
  const r = await improMin(_id, id, userId);
  if (r.res) {
    ans.added = true;
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Minus Added to improvementID ${id} for product ID ${_id} userID ${userId} ...`
    );
    const r1 = await user.addScore(userId, -1);
    if (r1.res) {
      console.log(
        "\x1b[35m%s\x1b[0m",
        `Minus Added to score for userID ${userId} ...`
      );
    }
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.post("/add/impro/answer", async function (req, res) {
  const pId = req.body.pId;
  const id = req.body.id;
  const answer = req.body.answer;
  const userId = req.body.userId;
  const ans = {
    added: false,
    error: null,
  };
  const r = await addImproAns(pId, id, userId, answer);
  if (r.res) {
    ans.added = true;
    console.log(
      "\x1b[35m%s\x1b[0m",
      `New Answer Added for Improvement Id ${id} for product ID ${pId} userID ${userId} ...`
    );
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.post("/add/question", async function (req, res) {
  const id = req.body.id;
  const userId = req.body.userId;
  const question = req.body.question;

  const ans = {
    added: false,
    error: null,
  };
  const r = await addQuestion(id, userId, question);
  if (r.res) {
    ans.added = true;
    const p = await product.findId(id);
    const raw = p.res.qandas[p.res.qandas.length - 1];
    console.log(
      "\x1b[35m%s\x1b[0m",
      `New Question Added for product ID ${id} userID ${userId} ...`
    );
    const usr = await user.addQuestion(userId, id, raw._id);
    if (usr) {
      console.log(
        "\x1b[35m%s\x1b[0m",
        `Question Added to User ${userId} Question_ID ${raw._id} ...`
      );
    }
  } else if (r.err) {
    r.error = r.err;
  }

  res.json(ans);
});

router.post("/add/question/answer", async function (req, res) {
  const pId = req.body.productId;
  const id = req.body.id;
  const answer = req.body.answer;
  const userId = req.body.userId;

  const ans = {
    added: false,
    error: null,
  };
  const r = await addQuestionAns(pId, id, userId, answer);
  if (r.res) {
    ans.added = true;
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Answer Added for Question Id ${id} for product ID ${pId} userID ${userId} ...`
    );
  } else if (r.err) {
    r.error = r.err;
  }

  res.json(ans);
});

module.exports = router;
