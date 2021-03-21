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
    const data = { id: r.res._id };

    sendMail(email, "confirm-email", data);
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

router.post("/reset-password", async function (req, res) {
  const { email, type } = req.body;
  if (!email) return res.json({ res: null, err: "Invalid Email" });
  const upd = await user.reqResetPassword(email);
  if (upd.err || !upd.res) return res.json({ res: null, err: "Invalid Email" });
  const r = await sendMail(email, type, { token: upd.res.token, email });
  return res.json(r);
});

router.post("/update-password", async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ res: null, err: "Invalid Email or Password!" });
  const r = await user.resetPassword(email, password);

  return res.json(r);
});

// router.get("/active/:id", function (req, res) {
//   const id = req.params.id;
//   console.log(id);
//   res.redirect("/");
// });

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

router.post("/notification/markasread", function (req, res) {
  const { id, userId } = req.body;
  const r = user.markNotifAsRead(userId, id);
  return null;
});

router.post("/notifications/markallasread", function (req, res) {
  const r = user.markAllNotifAsRead(req.body.userId);
  return null;
});

router.post("/activate-email", async function (req, res) {
  const r = { res: null, err: null };
  const { email, id } = req.body;
  if (!email || !id) {
    r.err = "Email not defined!";
    return res.json(r);
  }
  const data = { id };
  r.res = await sendMail(email, "confirm-email", data);
  return res.json(r);
});

router.post("/contact-us", async function (req, res) {
  const { email, sub, msg, files } = req.body;
  const r = { res: null, err: null };
  if (!email || !msg) {
    r.err = "Email not defined!";
    return res.json(r);
  }
  const data = { email, sub, msg, files };
  r.res = await sendMail(email, "contact-us", data);
  return res.json(r);
});

module.exports = router;
