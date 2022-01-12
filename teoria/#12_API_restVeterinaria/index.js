const http = require("http");
const url = require("url");
const stringDecoder = require("string_decoder").StringDecoder;

let resources = {
  pets: [
    { type: "Gato", name: "Tigresa", owner: "Diego" },
    { type: "Perro", name: "Firulais", owner: "Juan" },
  ],
};
const serverRequestListener = (req, res) => {
  // 1 get url
  const originalURL = req.url;
  const parsedURL = url.parse(originalURL, true);
  // 1.1 get route
  const route = parsedURL.pathname.slice(1);
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
    // 2.1 parse buffer about content type
    if (headers["content-type"] === "application/json") {
      buffer = JSON.parse(buffer);
    }
    // 2.2 if route contains a parameter
    // get the route clean and the parameter
    if (route.indexOf("/")) {
      var [routeClean, index = null] = route.split("/");
    }
    // 2.3 organize data
    const data = {
      route: routeClean ? routeClean : route,
      index,
      method,
      query,
      headers,
      payload: buffer,
    };
    console.log(data);
    // 3 handle the route
    let handler;
    if (data.route && responses[data.route][method]) {
      handler = responses[data.route][method];
    } else {
      handler = responses.notFound;
    }

    // 4 send response about route
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

const responses = {
  "": (data, callback) => {
    callback(200, { message: "Estas en /" });
  },
  mascotas: {
    get: (data, callback) => {
      if (data.index) {
        if (resources.pets[data.index]) {
          return callback(200, resources.pets[data.index]);
        }
        return callback(404, {
          message: `No existe una mascota con el indice ${data.index}`,
        });
      } else {
        callback(200, resources.pets);
      }
    },
    post: (data, callback) => {
      callback(200, resources.pets);
    },
  },
  notFound: (data, callback) => {
    callback(404, { message: "No se encontro la ruta" });
  },
};

const server = http.createServer(serverRequestListener);

server.listen(5000, () => {
  console.log("Server running on localhost:5000");
});
