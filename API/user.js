const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const user = require("../Model/user");
const { sendMail } = require("../mail");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/all", async function (req, res) {
  const ans = {
    results: null,
    errors: null,
  };

  const r = await user.findAll();
  if (r.res) {
    ans.results = r.res;
  } else if (r.err) {
    ans.errors = r.err;
  }
  res.json(ans);
});

router.post("/add", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const ans = {
    add: false,
    results: null,
    errors: null,
  };

  const r = await user.addnew(email, firstName, lastName, password);
  if (r.err) {
    ans.errors = r.err;
  } else if (r.res) {
    ans.add = true;
    // var expiryDate = new Date();
    // expiryDate.setMonth(expiryDate.getMonth() + 1);
    // res.cookie("_SSD", JSON.stringify(rep.results), {
    //   Expires: expiryDate,
    // });

    sendMail(email, "/active/" + r.res._id);
    ans.results = r.res;
  }

  res.json(ans);
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
      userPicture: r.res.userPicture,
      score: r.res.score,
      joinAt: r.res.joinAt,
    };
    var expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    res.cookie("_SSDI", r.res.id, {
      Expires: expiryDate,
    });
    res.cookie("_SSD", JSON.stringify(re), {
      Expires: expiryDate,
    });
    res.cookie("_SSDc", JSON.stringify(r.res.card), {
      Expires: expiryDate,
    });

    ans.findUser = true;
    ans.result = r.res;
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

router.post("/update", async function (req, res) {
  const { id, firstName, lastName, userName, userPicture } = req.body;

  const ans = {
    add: false,
    results: null,
    errors: null,
  };

  const r = await user.updateUser(
    id,
    userName,
    firstName,
    lastName,
    userPicture
  );
  if (r.err) {
    ans.errors = r.err;
  } else if (r.res) {
    ans.add = true;
    ans.results = r.res;
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
    ans.result = r.res;
    //  {
    //   improvements: r.res.improvements,
    //   questions: r.res.questions,
    // };
  } else if (r.err) {
    ans.error = r.err;
  }
  // else {
  //   ans.result = "User not fund";
  //   console.log(
  //     "\x1b[31m%s\x1b[0m",
  //     `User not found with this ID ${userId} ...`
  //   );
  // }

  res.json(ans);
});

router.post("/lasttime/:id", async function (req, res) {
  const id = req.params.id;
  const ans = {
    addes: false,
    errors: null,
  };

  const r = await user.setLastTime(id);
  if (r.res) {
    ans.assed = true;
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

router.get("/active/:id", function (req, res) {
  const id = req.params.id;
  console.log(id);
  res.redirect("/");
});

router.get("/usr/:userName", async function (req, res) {
  const userName = req.params.userName;
  const ans = {
    find: false,
    result: null,
    errors: null,
  };

  const r = await user.findByUserName(userName);
  if (r.res) {
    ans.find = true;
    ans.result = r.res;
  } else if (r.err) {
    ans.error = r.err;
  }

  res.json(ans);
});

module.exports = router;
