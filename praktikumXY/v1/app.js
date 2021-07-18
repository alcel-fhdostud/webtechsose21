const http = require("http");
const startSeite = require("fs");
const route = require("../v1/routes/routes.js");
const server = http.createServer(function (request, response) {
  //Statuscode und Header schreiben
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  var html = "";
  startSeite.readFile(route.route(request.url), (err, data) => {
    if (data != undefined) {
      html = data.toString();
      response.end(html);
    }
  });
});

server.listen(8020, function () {
  console.log("Ich lausche nun auf http://localhost:8020");
});
