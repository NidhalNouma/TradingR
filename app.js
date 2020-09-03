const express = require("express");
const http = require("http");
const fs = require("fs");
const user = require("./API/user");
const done = require("./API/done");
const { checkUser, connect } = require("./log");
const product = require("./API/product");
const run = require("./socket/index");
const cors = require("cors");
// require("events").EventEmitter.defaultMaxListeners = 15;

const app = express();

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

const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = require("socket.io")(server);
run(io);
server.listen(port, () => console.log(`listening at port ${port}`));
