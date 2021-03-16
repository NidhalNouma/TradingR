// const nodemailer = require("nodemailer");
const ejs = require("ejs");
const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({ region: "eu-west-2" });
const ses = new AWS.SES({ apiVersion: "2010-12-01" });

// const ses = new aws.SES({
//   apiVersion: "2010-12-01",
//   region: "eu-west-2",
// });

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
// var transporter = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "cdd15777442946",
//     pass: "ba153f7551da9f",
//   },
// });

// let transporter = nodemailer.createTransport({
//   SES: { ses, aws },
// });

module.exports.sendMail = async function (email, type, data) {
  let r = { res: null, err: null };
  try {
    const mail = await mailOptions(email, type, data);
    // r.res = await transporter.sendMail(mail);
    r.res = await ses.sendEmail(mail).promise();
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
          resolve(params(email, str, "Reset Password"));
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
          resolve(params(email, src, "Confirm Email"));
        }
      });
    });
  }
};

function params(email, html, subject) {
  return {
    Destination: {
      ToAddresses: [email], // Email address/addresses that you want to send your email
    },
    // ConfigurationSetName: "<<ConfigurationSetName>>,",
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: html,
        },
        // Text: {
        //   Charset: "UTF-8",
        //   Data: "Hello Charith Sample description time 1517831318946",
        // },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: process.env.EMAIL_ADDRESS,
  };
}
