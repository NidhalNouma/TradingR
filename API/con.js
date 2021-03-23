const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const user = require("../Model/user");
const accounts = require("../Model/accounts");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/find", async function (req, res) {
  const { email, number, server, product } = req.body;
  if (!email || !server || !number || !product)
    return res.send("Input missing!");

  const ans = {
    findUser: false,
    result: null,
    error: null,
  };

  const r = await user.findByEmail(email);
  if (r.res) {
    ans.findUser = true;
    ans.result = r.res;
    if (r.res.sub) {
      if (r.res.accounts === null) {
        await user.addAccount(r.res._id, number, server, product);
      } else {
        const acc = r.res.accounts;
        const f = acc.account.find(
          (e) => e.server === server && e.number === number
        );
        if (!f) {
          await accounts.addAccount(r.res._id, number, server, product);
        } else {
          const p = f.product.find((e) => e.toString() === product);
          if (!p)
            await accounts.addProduct(r.res._id, f.number, f.server, product);
        }
      }
    }
  } else if (r.err) {
    ans.error = r.err;
  } else {
    ans.error = "Email not registered!";
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Cannot found user with email ${email} ... (email Incorrect)`
    );
  }
  res.json(ans);
});

router.post("/add/result", async function (req, res) {
  const { id, server, number, result } = req.body;
  if (!id || !server || !number || !result) return res.send("Input missing!");
  const r = await accounts.addResult(id, number, server, result);
  res.json(r);
});

module.exports = router;
