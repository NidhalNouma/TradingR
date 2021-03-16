const nodemailer = require("nodemailer");
const ejs = require("ejs");
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

module.exports.sendMail = async function (email, type, data) {
  let r = { res: null, err: null };
  try {
    const mail = await mailOptions(email, type, data);
    r.res = await transporter.sendMail(mail);
    console.log("Email sent: TO " + email);
  } catch (e) {
    console.log("error with sendMail", e);
    r.err = "Error with sending mail, please try again later";
  }
  return r;
};

const mailOptions = function (email, type, data) {
  console.log(type, data);
  if (type === "reset-password") {
    const path = "resetPassword.ejs";
    const url =
      process.env.URL + "/reset-password/" + data.email + "/" + data.token;
    const pdata = { url };

    return new Promise((resolve, reject) => {
      ejs.renderFile("./MailHTML/" + path, pdata, function (err, str) {
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
  } else if (type === "confirm-email") {
    const path = "verifyEmail.ejs";
    const url = process.env.URL + "/confirm-email/" + data.id;
    const pdata = { url };

    return new Promise((resolve, reject) => {
      ejs.renderFile("./MailHTML/" + path, pdata, function (err, str) {
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
  }
};
