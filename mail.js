const nodemailer = require("nodemailer");
const fs = require("fs");
let ejs = require("ejs");
require("dotenv").config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.EMAIL_ADDRESS,
//     pass: process.env.EMAIL_PASS,
//     clientId: process.env.OAUTH_CLIENTID,
//     clientSecret: process.env.OAUTH_CLIENT_SECRET,
//     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//   },
// });

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cdd15777442946",
    pass: "ba153f7551da9f",
  },
});

module.exports.sendMail = async function (email, url, type) {
  let r = { res: null, err: null };
  try {
    const mail = await mailOptions(email, url);
    r.res = await transporter.sendMail(mail);
    console.log("Email sent: TO " + email);
  } catch (e) {
    console.log("error with sendMail", e);
    r.err = e;
  }
  return r;
};

const mailOptions = function (email, url, type) {
  const path = type ? "resetPassword.ejs" : "verifyEmail.ejs";
  const data = { url: "https://tradingrev.com" };

  return new Promise((resolve, reject) => {
    ejs.renderFile("./MailHTML/" + path, data, function (err, str) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve({
          from: process.env.EMAIL_ADDRESS,
          to: email,
          subject: "Sending Email",
          html: str,
        });
      }
    });
  });
};
