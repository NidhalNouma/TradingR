const mongoose = require("mongoose");
require("dotenv").config();

const conn = function () {
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
    console.log("mongodb connect ...");
  });
  mongoose.connection.once("close", function () {
    console.log("mongodb connecttion closed ...");
  });
};

const close = function () {
  mongoose.connection.close(function (err) {
    if (err) {
      console.log("mongodb close connection error ", err);
    }
  });
};

module.exports = { connect: conn, close: close };
