const ejs = require("ejs");
const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({ region: "eu-west-2" });
const ses = new AWS.SES({ apiVersion: "2010-12-01" });

module.exports.sendMail = async function (email, type, data) {
  let r = { res: null, err: null };
  try {
    const mail = await mailOptions(email, type, data);
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
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: html,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: process.env.EMAIL_ADDRESS,
  };
}
