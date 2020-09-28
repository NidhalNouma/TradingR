const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports.sendMail = function (email, url) {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: "Sending Email",
    html:
      "<h1>TradingRev<h1> <p>Click Below to confirm your account</p> <a href=tradingrev.com/api/user" +
      url +
      ">Confirm<a/>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("error", error);
    } else {
      console.log("Email sent: TO " + email, info.response);
    }
  });
};
