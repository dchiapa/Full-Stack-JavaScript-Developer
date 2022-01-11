const http = require("http");

const serverRecuestListener = (req, res) => {
  // 1 get url
  console.log(req.url);
  // 2 get route
  // 3 send response about route
  res.end("Hello World");
};

const server = http.createServer(serverRecuestListener);

server.listen(5000, () => {
  console.log("Server running on localhost:5000");
});
