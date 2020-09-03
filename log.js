const { findById } = require("./Model/user");
const model = require("./Model/model");

async function checkUser(req, res, next) {
  console.log(req.originalUrl);
  if (req.headers.cookie) {
    const rawCookies = req.headers.cookie.split("; ");
    const parsedCookies = {};
    rawCookies.forEach((rawCookie) => {
      const parsedCookie = rawCookie.split("=");
      parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    if (parsedCookies._SSDI) {
      const r = await findById(parsedCookies._SSDI);
      if (r.res) {
        console.log("\x1b[35m%s\x1b[0m", "Find User ==> ", r.res.username);
        req.user = JSON.stringify(r.res);
        var expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        res.cookie("_SSD", r.res.username, {
          Expires: expiryDate,
        });
      } else {
        res.cookie("_SSD", { maxAge: 0 });
        res.cookie("_SSDI", { maxAge: 0 });
        res.cookie("_SSDc", { maxAge: 0 });
      }
    }
  }
  next();
}

function connect(req, res, next) {
  model.connect();
  next();
}

module.exports = { checkUser, connect };
