const mongoose = require("mongoose");
require("dotenv").config();

const conn = function () {
  mongoose.connect(process.env.DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("mongodb connect ...");
  });
};

const close = function () {
  mongoose.connection.close(function (err) {
    if (!err) {
      console.log("mongodb connection close ...");
    }
  });
};

module.exports = { connect: conn, close: close };
