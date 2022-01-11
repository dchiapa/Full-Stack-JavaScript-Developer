const http = require("http");
const url = require("url");
const stringDecoder = require("string_decoder").StringDecoder;

const serverRequestListener = (req, res) => {
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
  // 1.5 get payload
  // 1.5.1 declare a decoder and buffer
  const decoder = new stringDecoder("utf-8");
  let buffer = "";
  // 1.5.2 get payload
  // on data event add data decoded to buffer
  req.on("data", (data) => {
    buffer += decoder.write(data);
  });
  // 1.5.3 on end event
  req.on("end", () => {
    buffer += decoder.end();
    // 2 send response about route
    const responses = {
      "/": "Hola mundo desde nodeJS",
    };
    res.end(responses[route] || "No se encontro la ruta");
  });
};

const server = http.createServer(serverRequestListener);

server.listen(5000, () => {
  console.log("Server running on localhost:5000");
});
