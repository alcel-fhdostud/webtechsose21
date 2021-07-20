const http = require("http");
const startSeite = require("fs");
const route = require("./routes/routes.js");
const persistence = require("./models/persistence.js");
const temp = require("./test/buildHTML.js");
const express = require("express");
const app = express();

app.get("*", function (req, res) {
  var format = req.url.substring(req.url.lastIndexOf(".") + 1);
  console.log(format);
  res.writeHead(200, { "content-type": `text/${format}; charset=utf-8` });
  var html = "";
  startSeite.readFile(route.route(req.url), (err, data) => {
    if (data != undefined) {
      html = data.toString();
      res.end(html);
    }
  });
});

app.listen(8020, function () {
  console.log("Ich lausche nun auf http://localhost:8020");
});
