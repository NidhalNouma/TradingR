const mongoose = require("mongoose");
require("dotenv").config();

const conn = function () {
  if (mongoose.connection.readyState === 0)
    mongoose.connect(process.env.DB_HOST, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
  );

  mongoose.connection.once("open", function () {
    console.log("\x1b[32m%s\x1b[0m", "mongodb connect ...");
  });
  mongoose.connection.once("close", function () {
    console.log("\x1b[32m%s\x1b[0m", "mongodb connecttion closed ||<==");
  });
};

const close = function () {
  mongoose.connection.close(function (err) {
    if (err) {
      console.log("\x1b[41m%s\x1b[0m", "mongodb close connection error ", err);
    }
  });
};

module.exports = { connect: conn, close: close };
