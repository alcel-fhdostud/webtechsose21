const { compile } = require("ejs");
const persistence = require("../models/persistence.js");

function buildHTML(res, podcastNumber, episodenNummer) {
  const podcasts = persistence.podcastsArray;
  persistence.abo("https://feeds.lagedernation.org/feeds/ldn-mp3.xml", () => {
    persistence.abo("https://feeds.metaebene.me/lnp/m4a", () => {
      // HTML-Inhalt mittels Template-Literal erstellen
      var p = podcasts[podcastNumber];
      var html = `<!DOCTYPE html>
        <html lang="de">
            <head>
                <title>${p.titel}</title>
                <meta charset="utf-8">
            </head><body>
      <h1>Podcast-App Test!</h1>
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
          />`;

      if (episodenNummer >= 0) {
        var e = p.episoden[episodenNummer];
        html += `<hr>
         <h2>${e.titel}</h2>
         <article>${e.beschreibung}</article>`;
      }
      html += "</body></html>";
      res.end(html);
    });
  });
}

module.exports.buildHTML = buildHTML;
