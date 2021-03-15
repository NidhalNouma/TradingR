const fs = require("fs");
const uri = "./build/index.html";

fs.readFile(uri, "utf8", function (err, content) {
  if (err) {
    console.error(err);
  } else {
    const html = content.toString().replace("!!data!!", "<%- data -%>");
    fs.writeFile(uri, html, function (err) {
      if (err) console.error(err);
      console.log("<<<  html file replace  >>>");
    });
  }
});
