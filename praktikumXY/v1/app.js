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
app.use(express.static("./public"));

app.use(express.urlencoded({extended:false}));

app.get("/", function(req,res){
  res.render("index");
  console.log(persistence.podcasts[0].titel);
});


// app.get("/episode?pc=*&ep=*", function(req, res, next){  
//   buildHTML(res, 1, 1);
// });


app.get("/podcast", function(req, res){
  let podcastNumber = req.query.pc;
  let episodenNummer = req.query.ep;
    temp.buildHTML(res, podcastNumber, episodenNummer);

});



app.post("/abonnieren", function(req,res){
  console.log("testAbo");
  persistence.abonnieren(req.body.aboBtn, () => 
          { console.log("Podcasts importiert.");
  });
  res.redirect("/");
});



app.listen(8020, function () {
  console.log("Ich lausche nun auf http://localhost:8020");
});
