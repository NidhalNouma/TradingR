const express = require("express");
const http = require("http");
const fs = require("fs");
const user = require("./API/user");
const done = require("./API/done");
const { checkUser, connect } = require("./log");
const product = require("./API/product");
const run = require("./socket/index");
const cors = require("cors");
require("./passport");
require("events").EventEmitter.defaultMaxListeners = 100;

const app = express();

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(connect);
app.use(express.static("./html"));
app.use(cors());

app.use("/api/user", user);
app.use("/api/done", done);
app.use("/api/product", product);

app.get(
  [
    "/",
    "/strategys",
    "/indicators",
    "/source",
    "/product/:i",
    "/profile",
    "/profile/*",
    "/welcome",
  ],
  checkUser,
  (req, res) => {
    if (req.user) {
      fs.readFile("./html/index_.html", "utf8", function (err, content) {
        var rendered = content.toString().replace("<!-- data -->", req.user);
        res.send(rendered);
      });
    } else {
      res.sendFile("index_.html", { root: __dirname + "/html" });
    }
  }
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "back" }),
  function (req, res) {
    const redirect = req.session.oauth2return || "/";
    console.log(req.session, "\\\\/////");
    res.cookie("_SSDI", req.session.passport.user._id.toString());
    // delete req.session.oauth2return;

    res.redirect(redirect);
  }
);

const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = require("socket.io")(server);
run(io);
server.listen(port, () => console.log(`listening at port ${port}`));

// app.get("/auth/facebook", passport.authenticate("facebook"));
// app.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "back",
//     failureRedirect: "back",
//   })
// );
