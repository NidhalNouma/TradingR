const express = require("express");
const http = require("http");
const user = require("./API/user");
const done = require("./API/done");
const product = require("./API/product");
const run = require("./socket/index");
const cors = require("cors");
const { findById } = require("./Model/user");
require("events").EventEmitter.defaultMaxListeners = 15;

const app = express();

app.use(express.static("./html"));
app.use(cors());

app.use("/api/user", user);
app.use("/api/done", done);
app.use("/api/product", product);

app.get("*", (req, res) => {
  //   const rawCookies = req.headers.cookie.split("; ");
  //   const parsedCookies = {};
  //   rawCookies.forEach((rawCookie) => {
  //     const parsedCookie = rawCookie.split("=");
  //     parsedCookies[parsedCookie[0]] = parsedCookie[1];
  //   });
  //   if (parsedCookies._SSD) {
  //     const q = JSON.parse(decodeURIComponent(parsedCookies._SSD));
  //     findById(q.id, function (ans) {
  //       if (ans.find) {
  //         var expiryDate = new Date();
  //         expiryDate.setMonth(expiryDate.getMonth() + 1);
  //         const re = {
  //           id: ans.result._id,
  //           active: ans.result.active,
  //           username: ans.result.username,
  //           score: ans.result.score,
  //           joinAt: ans.result.joinAt,
  //           cardL: ans.result.card.length,
  //         };
  //         res.cookie("_SSD", JSON.stringify(re), {
  //           Expires: expiryDate,
  //         });
  //         res.cookie("_SSDc", JSON.stringify(ans.result.card), {
  //           Expires: expiryDate,
  //         });
  //         res.sendFile("index.html", { root: __dirname + "/html" });
  //       } else res.sendFile("index.html", { root: __dirname + "/html" });
  //     });
  // }else
  res.sendFile("index.html", { root: __dirname + "/html" });
});

const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = require("socket.io")(server);
run(io);
server.listen(port, () => console.log(`listening at port ${port}`));
