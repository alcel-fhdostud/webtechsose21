const http = require("http");
const startSeite = require("fs");
const route = require("./routes/routes.js");
const persistence = require("./models/persistence.js");
const temp = require("./test/buildHTML.js");
const server = http.createServer(function (request, response) {
  //Statuscode und Header schreiben
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  var html = "";
  if (!request.url.includes("?")) {
    startSeite.readFile(route.route(request.url), (err, data) => {
      if (data != undefined) {
        html = data.toString();
        response.end(html);
      }
    });
  } else {
    if (request.url.includes("/podcast?pc=")) {
      var number = request.url.substring(request.url.indexOf("=") + 1);
      html = temp.buildHTML(number, response);
      console.log("html");
      response.end(temp.buildHTML(number));
    }
  }
});

server.listen(8020, function () {
  console.log("Ich lausche nun auf http://localhost:8020");
});
