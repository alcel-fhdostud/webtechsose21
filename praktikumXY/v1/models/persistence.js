const parser = require("./podcastParser");

//10.2.1
class Podcast {
  constructor(
    titel,
    beschreibung,
    autor,
    besitzerName,
    besitzerEmail,
    bildURL,
    feedURL,
    kategorien,
    letztesUpdate,
    episoden
  ) {
    this.titel = titel;
    this.beschreibung = beschreibung;
    this.autor = autor;
    this.besitzerName = besitzerName;
    this.besitzerEmail = besitzerEmail;
    this.bildURL = bildURL;
    this.feedURL = feedURL;
    this.kategorien = kategorien;
    this.letztesUpdate = letztesUpdate;
    this.episoden = episoden;
  }

  addEpisode(episode) {
    this.episoden.push(episode);
    this.episoden.sort(function (x, y) {
      return new Date(y.datum) - new Date(x.datum);
    });
  }
}

//10.2.1
class Episode {
  constructor(titel, beschreibung, dauer, datum, episodenTon) {
    this.titel = titel;
    this.beschreibung = beschreibung;
    this.dauer = dauer;
    this.datum = datum;
    this.episodenTon = episodenTon;
  }

  getDauerInStundenUndMinuten() {
    return (
      Math.floor(this.dauer / 1000 / 60 / 60) +
      "h " +
      Math.floor((this.dauer % (1000 * 60 * 60)) / 1000 / 60) +
      "min"
    );
  }
}
//10.2.1
class EpisodeAudio {
  constructor(url, groesse, typ) {
    this.url = url;
    this.groesse = groesse;
    this.typ = typ;
  }
}

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
  var podcast = new Podcast(
    feed.meta.title,
    feed.meta.description,
    feed.meta.author,
    feed.meta.owner.name,
    feed.meta.owner.email,
    feed.meta.imageURL,
    url,
    feed.meta.categories,
    feed.meta.lastUpdate,
    []
  );
  for (e of feed.episodes) {
    podcast.addEpisode(
      new Episode(
        e.title,
        e.description,
        e.duration,
        e.pubDate,
        new EpisodeAudio(e.enclosure.url, e.enclosure.length, e.enclosure.type)
      )
    );
  }
  return podcast;
}
// Schnittstelle des Moduls definieren: Podcast-Array und abonnieren-Funktion
// von außen zugreifbar machen
module.exports.podcastsArray = podcasts;
module.exports.abo = abonnieren;
