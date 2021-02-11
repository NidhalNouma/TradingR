const mongoose = require("mongoose");
require("dotenv").config();

const conn = async function () {
  // console.log(mongoose.connection.readyState);
  if (mongoose.connection.readyState === 0) {
    try {
      const con = await mongoose.connect(process.env.DB_HOST, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        keepalive: true,
        poolSize: 1,
      });
      // console.log(con);
      console.log("\x1b[32m%s\x1b[0m", "mongodb connect ...");
    } catch (e) {
      console.log("\x1b[31m%s\x1b[0m", `Error mongodb connect ==> ${e}`);
    }
  }
  mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
  );
};

const close = function () {
  mongoose.connection.close(function (err) {
    if (err) {
      console.log("\x1b[41m%s\x1b[0m", "mongodb close connection error ", err);
    }
  });
};

module.exports = { connect: conn, close: close };
