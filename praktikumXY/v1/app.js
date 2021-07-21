const http = require("http");
const startSeite = require("fs");
const route = require("./routes/routes.js");
const persistence = require("./models/persistence.js");
const podcasts = persistence.podcasts;
const episoden = persistence.episoden;
const temp = require("./test/buildHTML.js");
const express = require("express");
const app = express();

// app.get("*", function (req, res) {
//   res.writeHead(200);
//   route.route(res, req.url);
// });

app.set("view engine", "ejs");
app.set("views", "views");

// app.use(express.static("../v0/"));
//TODO css url ändern
app.use(express.static("./public/"));

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index", { podcasts: persistence.podcasts });
  //console.log(persistence.podcasts[0].bildURL);
});
// https://feeds.lagedernation.org/feeds/ldn-mp3.xml

app.get("/podcast", function (req, res) {
  let podcastNummer = req.query.pc;
  res.render("./podcast", {
    p: persistence.podcasts[podcastNummer],
    index: podcastNummer,
  });
});

app.get("/episode", function (req, res) {
  let podcastNummer = req.query.pc;
  let episodenNummer = req.query.ep;
  res.render("./episode", {
    p: persistence.podcasts[podcastNummer],
    indexPodcast: podcastNummer,
    indexEpisode: episodenNummer,
  });
  //temp.buildHTML(res, persistence.podcasts, podcastNumber, episodenNummer);
});

app.post("/abonnieren", function (req, res) {
  persistence.abonnieren(req.body.aboBtn, () => {
    res.redirect("/");
  });
});

app.listen(8020, function () {
  console.log("Ich lausche nun auf http://localhost:8020");
});
