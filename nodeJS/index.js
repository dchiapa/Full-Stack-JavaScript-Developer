const http = require("http");

const serverRecuestListener = (req, res) => {
  res.end("Hello World");
};

const server = http.createServer(serverRecuestListener);

server.listen(5000, () => {
  console.log("Server running on localhost:5000");
});
