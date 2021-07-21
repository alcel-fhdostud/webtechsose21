const http = require("http");
const startSeite = require("fs");
const route = require("./routes/routes.js");
const persistence = require("./models/persistence.js");
const temp = require("./test/buildHTML.js");
const express = require("express");
const app = express();

app.get("*", function (req, res) {
  res.writeHead(200);
  route.route(res, req.url);
});

app.listen(8020, function () {
  console.log("Ich lausche nun auf http://localhost:8020");
});
