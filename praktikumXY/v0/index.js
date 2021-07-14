//Praktikum 9
function switchAnsicht(e) {
  e.style.display = "none";
  if (e.id == "btnListenAnsicht") {
    //Listenansicht wird sichtbar
    document.getElementById("btnKachelAnsicht").style.display = "flex";
    document.getElementById("listenAnsichtHTML").style.display = "flex";
    document.getElementById("kachelAnsichtHTML").style.display = "none";
    document.getElementById("kachelAnsichtCSS").setAttribute("href", "");
  } else {
    //kachelansicht wird sichtbar
    document.getElementById("btnListenAnsicht").style.display = "flex";
    document.getElementById("listenAnsichtHTML").style.display = "none";
    document.getElementById("kachelAnsichtHTML").style.display = "";
    document
      .getElementById("kachelAnsichtCSS")
      .setAttribute("href", "index.css");
  }
}
