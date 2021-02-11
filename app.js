const express = require("express");
const http = require("http");
const fs = require("fs");
const { stripe } = require("./API/stripe");
const user = require("./API/user");
const product = require("./API/product");
const post = require("./API/post");
const { checkUser, connect } = require("./log");
const run = require("./socket/index");
const cors = require("cors");
require("dotenv").config();
require("./passport");
require("events").EventEmitter.defaultMaxListeners = 10000;

const app = express();

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(connect);
app.use(express.static("./html"));
app.use(cors());

app.use("/api/user", user);
app.use("/api/pay", stripe);
app.use("/api/product", product);
app.use("/api/post", post);

app.get(
  [
    "/",
    "/strategys",
    "/indicators",
    "/pricing",
    "/product/:i",
    "/profile",
    "/profile/*",
    "/welcome",
  ],
  checkUser,
  (req, res) => {
    if (req.user) {
      fs.readFile("./html/index_.html", "utf8", function (err, content) {
        var rendered = content.toString().replace("!!data!!", req.user);
        res.send(rendered);
      });
    } else {
      res.sendFile("index_.html", { root: __dirname + "/html" });
    }
  }
);

app.get("/auth/google", function (req, res, next) {
  const auth = passport.authenticate("google", { scope: ["profile", "email"] });
  auth(req, res, next);
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "back" }),
  function (req, res) {
    res.cookie("_SSDI", req.session.passport.user._id.toString());
    res.redirect("/");
  }
);

const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = require("socket.io")(server);
run(io);

server.listen(port, () => console.log(`listening at port ${port}`));
