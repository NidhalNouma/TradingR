const {
  findById,
  confirmResetPassword,
  activeAccount,
} = require("./Model/user");
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

async function checkResetPassword(email, token) {
  const usr = await confirmResetPassword(email, token);
  if (usr.res) {
    const { forgetPassword } = usr.res;
    const now = new Date();
    const expireTime = new Date(forgetPassword.updateAt);
    // console.log(now, expireTime, now - expireTime, 60 * 60 * 1000);
    if (now - expireTime < 60 * 60 * 1000) return true;
  }

  return false;
}

async function confirmEmail(_id) {
  const r = await activeAccount(_id);

  return r;
}

module.exports = { checkResetPassword, checkUser, connect, confirmEmail };
