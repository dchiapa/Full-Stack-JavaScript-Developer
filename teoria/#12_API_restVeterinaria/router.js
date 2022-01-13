const resources = require("./resources");

module.exports = {
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
    put: (data, callback) => {
      if (typeof data.index !== "undefined") {
        if (resources.pets[data.index]) {
          resources.pets[data.index] = data.payload;
          return callback(200, resources.pets[data.index]);
        }
        return callback(404, {
          message: `No existe una mascota con el indice ${data.index}`,
        });
      } else {
        return callback(400, { message: `No envió ningún indice` });
      }
    },
    post: (data, callback) => {
      resources.pets.push(data.payload);
      callback(201, data.payload);
    },
  },
  notFound: (data, callback) => {
    callback(404, { message: "No se encontro la ruta" });
  },
};
