const http = require("http");
const url = require("url");

const serverRecuestListener = (req, res) => {
  // 1 get url
  const originalURL = req.url;
  const parsedURL = url.parse(originalURL, true);
  // 1.1 get route
  const route = parsedURL.pathname;
  // 1.2 get method
  const method = req.method.toLowerCase();
  // 1.3 get query
  const { query = {} } = parsedURL;
  // 1.4 get headers
  const { headers = {} } = req;
  // 2 send response about route
  const responses = {
    "/": "Hola mundo desde nodeJS",
  };
  res.end(responses[route] || "No se encontro la ruta");
};

const server = http.createServer(serverRecuestListener);

server.listen(5000, () => {
  console.log("Server running on localhost:5000");
});
