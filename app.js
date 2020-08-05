const express = require("express");
const user = require("./API/user");
const done = require("./API/done");
const product = require("./API/product");
const cors = require("cors");

const app = express();
app.use(express.static("./html"));
app.use(cors());

app.use("/api/user", user);
app.use("/api/done", done);
app.use("/api/product", product);

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "/html" });
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening at port ${port}`));
