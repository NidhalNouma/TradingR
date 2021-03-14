const nodemailer = require("nodemailer");
const fs = require("fs");
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
  return new Promise((resolve, reject) => {
    fs.readFile(
      "./MailHTML/resetPassword.html",
      "utf-8",
      function (err, content) {
        if (content)
          resolve({
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: "Sending Email",
            html: content.toString(),
          });
        else {
          console.log(err);
          reject(err);
        }
      }
    );
  });
};
