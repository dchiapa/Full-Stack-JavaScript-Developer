const http = require("http");
const url = require("url");

const serverRecuestListener = (req, res) => {
  // 1 get url
  const originalURL = req.url;
  const parsedURL = url.parse(originalURL, true);
  console.log({ originalURL, parsedURL });
  // 2 get route
  // 3 send response about route
  res.end("Hello World");
};

const server = http.createServer(serverRecuestListener);

server.listen(5000, () => {
  console.log("Server running on localhost:5000");
});
