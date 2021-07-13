//Praktikum 9
function switchAnsicht(e) {
  e.style.display = "none";
  if (e.id == "listenAnsicht") {
    //Listenansicht wird sichtbar
    document.getElementById("kachelAnsicht").style.display = "flex";
    document.getElementById("listenAnsichtHTML").style.display = "flex";
    document.getElementById("kachelAnsichtHTML").style.display = "none";
    document.getElementById("kachelAnsichtCSS").setAttribute("href", "");
  } else {
    //kachelansicht wird sichtbar
    document.getElementById("listenAnsicht").style.display = "flex";
    document.getElementById("listenAnsichtHTML").style.display = "none";
    document.getElementById("kachelAnsichtHTML").style.display = "flex";
    document
      .getElementById("kachelAnsichtCSS")
      .setAttribute("href", "index.css");
  }
}
