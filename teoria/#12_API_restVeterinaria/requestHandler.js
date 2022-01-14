const url = require("url");
const stringDecoder = require("string_decoder").StringDecoder;
const router = require("./router");

module.exports = (req, res) => {
  //* get data from the request
  const originalURL = req.url;
  const parsedURL = url.parse(originalURL, true);
  const route = parsedURL.pathname.slice(1);
  const method = req.method.toLowerCase();
  const { query = {} } = parsedURL;
  const { headers = {} } = req;
  const decoder = new stringDecoder("utf-8");
  let buffer = "";
  //* on beginning of the request
  req.on("data", (data) => {
    //* buffer data accumulating
    buffer += decoder.write(data);
  });
  //* on end of the request
  req.on("end", () => {
    //* buffer stop data accumulating
    buffer += decoder.end();
    //* parsing buffer data
    if (headers["content-type"] === "application/json") {
      buffer = JSON.parse(buffer);
    }
    //* split the request into a route and an index
    if (route.indexOf("/")) {
      var [routeClean, index = null] = route.split("/");
    }
    //* ordered data
    const data = {
      route: routeClean ? routeClean : route,
      index: index && index !== "" ? index : null,
      method,
      query,
      headers,
      payload: buffer,
    };
    //* declare a handler function
    let handler;
    if (data.route && router[data.route][method]) {
      handler = router[data.route][method];
    } else {
      handler = router.notFound;
    }
    //* ejecution the handler function
    if (typeof handler === "function") {
      handler(data, (statusCode, message) => {
        const response = JSON.stringify(message);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode);
        res.end(response);
      });
    }
  });
};
