const http = require("http");

const requestHandler = require("./requestHandler");

global.resources = {
  pets: [
    { type: "Gato", name: "Tigresa", owner: "Diego" },
    { type: "Perro", name: "Firulais", owner: "Juan" },
  ],
};

const server = http.createServer(requestHandler);

server.listen(5000, () => {
  console.log("Server running on localhost:5000");
});
