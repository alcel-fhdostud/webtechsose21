let x = function getViewportWidth() {
  return window.innerWidth || document.documentElement.clientWidth;
};
console.log(`Die Viewport-Breite beträgt: ${x()} Pixel.`);

//8.1
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

  //8.3
  addEpisode(episode) {
    this.episoden.push(episode);
    //Haufen 💩
    this.episoden.sort(function (x, y) {
      return new Date(y.datum) - new Date(x.datum);
    });
  }
}

//8.2
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

class EpisodeAudio {
  constructor(url, groesse, typ) {
    this.url = url;
    this.groesse = groesse;
    this.typ = typ;
  }
}

var audio1 = new EpisodeAudio(
  "https://audio.de/podcast1",
  120,
  "video/x-msvideo"
);
var audio2 = new EpisodeAudio(
  "https://audio.de/podcast2",
  412,
  "video/x-msvideo"
);
var episode1 = new Episode(
  "Episode 1",
  "Es wird über dinge gesprochen",
  5932859,
  new Date("2021-07-12T16:48:02"),
  audio1
);
var episode2 = new Episode(
  "Episode 2",
  "Es wird über mehr dinge gesprochen",
  5189391,
  new Date("2021-07-13T17:30:42"),
  audio2
);
var podcast1 = new Podcast(
  "Doge Podcast",
  "Hunde",
  "Hunde Komitee Dortmund",
  "Dummy",
  "dummy.d2000@gmail.com",
  "https://images-eu.ssl-images-amazon.com/images/I/81-yKbVND-L.png",
  null,
  new Array("Technology", "Web-Engineering"),
  new Date("2021-07-11T02:30:02"),
  []
);
podcast1.addEpisode(episode1);
podcast1.addEpisode(episode2);
var podcast2 = new Podcast(
  "Podcast 2",
  "Podcasts",
  "Komitee Dortmund",
  "Dummy2",
  "dummy.d3000@gmail.com",
  "https://images-eu.ssl-images-amazon.com/images/I/81-yKbVND-L.png",
  null,
  new Array("Technology", "Web-Engineering"),
  new Date("2021-07-11T02:37:02"),
  []
);
podcast2.addEpisode(episode1);
podcast2.addEpisode(episode2);
var podcastArray = [podcast1, podcast2];

for (p of podcastArray) {
  console.log(p.titel);
  for (e of p.episoden) {
    console.log("  " + e.titel + " (" + e.getDauerInStundenUndMinuten() + ")");
  }
}
