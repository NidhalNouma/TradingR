const express = require("express");
const http = require("http");
const user = require("./API/user");
const done = require("./API/done");
const product = require("./API/product");
const run = require("./socket/index");
const cors = require("cors");
require("events").EventEmitter.defaultMaxListeners = 15;

const app = express();

app.use(express.static("./html"));
app.use(cors());

app.use("/api/user", user);
app.use("/api/done", done);
app.use("/api/product", product);

app.get("*", (req, res) => {
  const rawCookies = req.headers.cookie.split("; ");
  const parsedCookies = {};
  rawCookies.forEach((rawCookie) => {
    const parsedCookie = rawCookie.split("=");
    parsedCookies[parsedCookie[0]] = parsedCookie[1];
  });
  if (parsedCookies._SSD) {
    const q = JSON.parse(decodeURIComponent(parsedCookies._SSD));

    console.log(q.id);
  }

  res.sendFile("index.html", { root: __dirname + "/html" });
});

const port = process.env.PORT || 8080;

const server = http.createServer(app);
const io = require("socket.io")(server);
run(io);

server.listen(port, () => console.log(`listening at port ${port}`));
