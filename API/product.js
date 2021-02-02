const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");

const {
  addNewProduct,
  addNewVersion,
  findAllProduct,
  findProductById,
  subscribe,
  desubscribe,
  hide,
  getUserIm,
  getUserQA,
  findUserSubs,
} = require("../Model/product");
const { addImpro, addImproAns, improVote } = require("../Model/impro");

const { addQuestion, addQuestionAns } = require("../Model/QandA");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/impro", async function (req, res) {
  const id = req.body.id;
  const pId = req.body.pId;
  const userId = req.body.userId;
  const impro = req.body.impro;
  const imgs = req.body.imgs;

  const ans = {
    added: false,
    id: null,
    error: null,
  };

  const rsp = await addImpro(id, pId, userId, impro, imgs);
  if (rsp.res) {
    ans.added = true;
    ans.id = rsp.id;
  } else {
    ans.error = rsp.err;
  }

  res.json(ans);
});

router.post("/impro/plus", async function (req, res) {
  const _id = req.body.id;
  const pId = req.body.pId;
  const id = req.body.impId;
  const userId = req.body.userId;
  const authId = req.body.authId;

  const ans = {
    added: false,
    error: null,
  };
  const r = await improVote(_id, pId, id, userId, "Plus", authId);
  if (r.res) {
    ans.added = true;
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.post("/impro/minus", async function (req, res) {
  const _id = req.body.id;
  const pId = req.body.pId;
  const id = req.body.impId;
  const userId = req.body.userId;
  const authId = req.body.authId;

  const ans = {
    added: false,
    error: null,
  };
  const r = await improVote(_id, pId, id, userId, "Minus", authId);
  if (r.res) {
    ans.added = true;
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.post("/impro/answer", async function (req, res) {
  const id = req.body.id;
  const pId = req.body.pId;
  const rId = req.body.rId;
  const userId = req.body.userId;
  const answer = req.body.answer;
  const authId = req.body.authId;

  const ans = {
    added: false,
    error: null,
  };
  const r = await addImproAns(id, pId, rId, userId, answer, authId);
  if (r.res) {
    ans.added = true;
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.post("/question", async function (req, res) {
  const id = req.body.id;
  const pId = req.body.pId;
  const userId = req.body.userId;
  const question = req.body.question;
  const imgs = req.body.imgs;

  const ans = {
    added: false,
    error: null,
    id: null,
  };

  const r = await addQuestion(id, pId, userId, question, imgs);
  if (r.res) {
    ans.added = true;
    ans.id = r.id;
  } else if (r.err) {
    ans.error = r.err.message;
  }

  res.json(ans);
});

router.post("/question/answer", async function (req, res) {
  const id = req.body.id;
  const pId = req.body.pId;
  const rId = req.body.rId;
  const userId = req.body.userId;
  const answer = req.body.answer;
  const authId = req.body.authId;

  const ans = {
    added: false,
    error: null,
  };
  const r = await addQuestionAns(id, pId, rId, userId, answer, authId);
  if (r.res) {
    ans.added = true;
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.get("/user/impro/:id", async function (req, res) {
  const _id = req.params.id;

  const ans = {
    result: null,
    error: null,
  };
  const r = await getUserIm(_id);
  if (r.res) {
    ans.result = r.res;
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.get("/user/qandas/:id", async function (req, res) {
  const _id = req.params.id;

  const ans = {
    result: null,
    error: null,
  };
  const r = await getUserQA(_id);
  if (r.res) {
    ans.result = r.res;
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.get("/user/subscriptions/:id", async function (req, res) {
  const _id = req.params.id;

  const ans = {
    result: null,
    error: null,
  };
  const r = await findUserSubs(_id);
  if (r.res) {
    ans.result = r.res;
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

// --------------------------------------------------------------------------------------

router.post("/new", async function (req, res) {
  const type = req.body.type;
  const pr = {
    version: req.body.version,
    title: req.body.title,
    description: req.body.description,
    img: req.body.img,
    media: req.body.media,
    available: {
      MT4: req.body.MT4,
      MT5: req.body.MT5,
      tradingView: req.body.tradingView,
    },
    moreDes: req.body.moreDes,
  };
  const ans = {
    added: false,
    error: null,
  };
  const r = await addNewProduct(type, pr);
  if (r.res) {
    ans.added = true;
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.post("/newversion", async function (req, res) {
  const id = req.body.id;
  const pr = {
    version: req.body.version,
    title: req.body.title,
    description: req.body.description,
    img: req.body.img,
    media: req.body.media,
    available: {
      MT4: req.body.mt4,
      MT5: req.body.mt5,
      tradingRev: req.body.tradingRev,
    },
  };
  const ans = {
    added: false,
    error: null,
  };
  if (id === undefined) {
    ans.error = "id not define";
    res.json(ans);
    return;
  }
  const r = await addNewVersion(id, pr);
  if (r.res) {
    ans.added = true;
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.get("/", async function (req, res) {
  const ans = {
    find: false,
    results: null,
    error: null,
  };
  const ty = req.query.type;

  const r = await findAllProduct(ty);
  if (r.res) {
    ans.find = true;
    ans.results = r.res;
  } else if (r.err) {
    r.error = r.err;
  }

  res.json(ans);
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const ans = {
    find: false,
    result: null,
    error: null,
  };
  const r = await findProductById(id);
  if (r.res) {
    ans.find = true;
    ans.result = r.res;
  } else if (r.err) {
    r.error = r.err;
  }
  res.json(ans);
});

router.post("/subscribe", async function (req, res) {
  const pvId = req.body.pvId;
  const userId = req.body.userId;
  const ans = {
    added: false,
    error: null,
  };
  const r = await subscribe(pvId, userId);
  if (r.res) {
    ans.added = true;
  } else if (r.err) {
    r.error = r.err;
  }
  res.json(ans);
});

router.post("/dessubscribe", async function (req, res) {
  const pvId = req.body.pvId;
  const userId = req.body.userId;
  const ans = {
    added: false,
    error: null,
  };
  const r = await desubscribe(pvId, userId);
  if (r.res) {
    ans.added = true;
  } else if (r.err) {
    r.error = r.err;
  }
  res.json(ans);
});

router.post("/hide", async function (req, res) {
  const id = req.body.id;
  const ans = {
    hided: false,
    error: null,
  };
  const r = await hide(id);
  if (r.res) {
    ans.added = true;
  } else if (r.err) {
    r.error = r.err;
  }
  res.json(ans);
});

module.exports = router;
