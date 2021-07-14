const parser = require("./podcastParser");

// [TODO]
// Hier Ihren Code zu den Objekten "Podcast", "Episode" und "EpisodeAudio" 
// aus Praktikum 8 hinein (ohne Beispieldaten!) hineinkopieren

const podcasts = [];

/**
 * Abonniert einen Podcast, indem die Daten von der gegebenen Feed-URL
 * importiert werden. Der Import selbst erfolgt asynchron, daher wird
 * fuer Folgetaetigkeiten eine Callback-Funktion benötigt.
 *
 * @param {String} url Die Feed-URL des Podcasts, welcher abonniert werden soll.
 * @param {Function} callback Callback-Funktion, die festlegt, was nach erfolgtem
 *                            Import passieren soll.
 */
function abonnieren(url, callback) {
  parser.parseFeed(url, (feed) => {
    podcasts.push(konvertieren(url, feed));
    if (callback) callback();
  });
}

/**
 * Konvertiert die von einer URL importierten Feed-Daten in fuer diese Web-
 * Anwendung passende Datenobjekte (Podcast, Episode, EpisodeAudio)
 *
 * @param {String} url Die Feed-URL des Podcasts, von welcher importiert wurde.
 * @param {Object} feed Feed-Objekt gemaess https://www.npmjs.com/package/podcast-feed-parser#default
 */
function konvertieren(url, feed) {
  // [TODO]
  // Funktion implementieren
}

// [TODO]
// Schnittstelle des Moduls definieren: Podcast-Array und abonnieren-Funktion
// von außen zugreifbar machen