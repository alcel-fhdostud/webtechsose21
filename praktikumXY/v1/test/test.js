const http = require("http");
const persistence = require("../models/persistence.js");
const server = http.createServer(function (request, response) {
  //Statuscode und Header schreiben
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });

  //10.3
  //Importiert nacheinander die Feeds der Podcasts "Lage der Nation" und "Logbu
  //ch: Netzpolitik"
  const podcasts = persistence.podcastsArray;
  persistence.abo("https://feeds.lagedernation.org/feeds/ldn-mp3.xml", () => {
    persistence.abo("https://feeds.metaebene.me/lnp/m4a", () => {
      console.log("Podcasts importiert.");
      // HTML-Inhalt mittels Template-Literal erstellen
      var html = `<!DOCTYPE html>
        <html lang="de">
            <head>
                <title>Podcast-App Test</title>
                <meta charset="utf-8">
            </head><body>
      <h1>Podcast-App Test!</h1>`;
      for (p of podcasts) {
        html += `
        <hr>
        <header>
        <h1>${p.titel}</h1>
        ${p.beschreibung}
        </header>
          <img
            src=${p.bildURL}
            width="100"
            height="100"
            alt="Podcast Bild"
          />
          <ul>`;
        for (e of p.episoden) {
          html += `<li> ${e.titel}`;
        }
        html += `</ul>`;
      }
      html += `</body></html>`;
      //Inhalt in einem einzigen Chunk schicken
      response.end(html);
    });
  });
});

server.listen(8844, function () {
  console.log("Ich lausche nun auf http://localhost:8844");
});
