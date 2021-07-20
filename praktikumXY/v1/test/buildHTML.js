const { compile } = require("ejs");
const persistence = require("../models/persistence.js");

function buildHTML(value) {
  console.log(value);
  const podcasts = persistence.podcastsArray;
  persistence.abo("https://feeds.lagedernation.org/feeds/ldn-mp3.xml", () => {
    persistence.abo("https://feeds.metaebene.me/lnp/m4a", () => {
      console.log("Podcasts importiert.");
      // HTML-Inhalt mittels Template-Literal erstellen
      var p = podcasts[value];
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
          /></body></html>`;
      console.log(html);
      return html;
    });
  });
}

module.exports.buildHTML = buildHTML;
