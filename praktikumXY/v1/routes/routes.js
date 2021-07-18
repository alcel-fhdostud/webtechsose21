function route(url) {
  switch (url) {
    case "/":
    case "/index.html":
      return urlBuilder("/index.html");
    default:
      return urlBuilder(url);
  }
}
function urlBuilder(name) {
  console.log(name);
  return `../v0${name}`;
}

module.exports.route = route;
