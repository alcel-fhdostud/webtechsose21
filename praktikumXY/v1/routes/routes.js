const fs = require("fs");
const { buildHTML } = require("../test/buildHTML");
function route(res, url) {
  if (url.includes("pc=")) {
    if (url.includes("ep=")) {
      var podcastNumber = url.substring(
        url.indexOf("=") + 1,
        url.indexOf("&ep")
      );
      var episodeNumber = url.substring(url.lastIndexOf("=") + 1);
      buildHTML(res, podcastNumber, episodeNumber);
      return;
    }
    var podcastNumber = url.substring(url.indexOf("=") + 1);
    buildHTML(res, podcastNumber, -1);
  } else {
    switch (url) {
      case "/":
      case "/index.html":
        htmlBuilder(res, "/index.html");
        break;
      default:
        htmlBuilder(res, url);
        break;
    }
  }
}
function htmlBuilder(res, name) {
  fs.readFile(`../v0${name}`, (err, data) => {
    if (data != undefined) {
      res.end(data.toString());
    }
  });
}

module.exports.route = route;
