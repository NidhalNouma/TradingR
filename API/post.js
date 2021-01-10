const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");

const {
  findAll,
  findById,
  findByAuth,
  addPost,
  postComment,
  postReply,
} = require("../Model/Post");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", async function (req, res) {
  const ans = {
    result: false,
    error: null,
  };

  const rsp = await findAll();
  if (rsp.res) {
    ans.result = rsp.res;
  } else {
    ans.error = rsp.err;
  }

  res.json(ans);
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const ans = {
    result: false,
    error: null,
  };

  const rsp = await findById(id);
  if (rsp.res) {
    ans.result = rsp.res;
  } else {
    ans.error = rsp.err;
  }

  res.json(ans);
});

router.get("/auth/:id", async function (req, res) {
  const id = req.params.id;
  const ans = {
    result: false,
    error: null,
  };

  const rsp = await findByAuth(id);
  if (rsp.res) {
    ans.result = rsp.res;
  } else {
    ans.error = rsp.err;
  }

  res.json(ans);
});

router.post("/", async function (req, res) {
  const title = req.body.title;
  const content = req.body.content;
  const userId = req.body.authId;

  const ans = {
    added: false,
    id: null,
    error: null,
  };

  const rsp = await addPost(userId, title, content);
  if (rsp.res) {
    ans.added = true;
    ans.id = rsp.res;
  } else {
    ans.error = rsp.err;
  }

  res.json(ans);
});

router.post("/comment", async function (req, res) {
  const id = req.body.id;
  const userId = req.body.userId;
  const content = req.body.content;

  const ans = {
    added: false,
    id: null,
    error: null,
  };

  const rsp = await postComment(id, userId, content);
  if (rsp.res) {
    ans.added = true;
    ans.id = rsp.id;
  } else {
    ans.error = rsp.err;
  }

  res.json(ans);
});

router.post("/comment/reply", async function (req, res) {
  const id = req.body.id;
  const cId = req.body.cId;
  const userId = req.body.userId;
  const content = req.body.content;

  const ans = {
    added: false,
    id: null,
    error: null,
  };

  const rsp = await postReply(id, cId, userId, content);
  if (rsp.res) {
    ans.added = true;
    ans.id = rsp.id;
  } else {
    ans.error = rsp.err;
  }

  res.json(ans);
});

// router.post("/upload_image", async function (req, res) {
//   const ans = {
//     added: false,
//     id: null,
//     error: null,
//   };

//   console.log(req.body);

//   res.json(ans);
// });

module.exports = router;
