const resources = require("./resources");

module.exports = {
  "": (data, callback) => {
    callback(200, { message: "Estas en /" });
  },
  mascotas: {
    post: (data, callback) => {
      resources.pets.push(data.payload);
      callback(201, data.payload);
    },
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
      if (data.index !== null) {
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
    delete: (data, callback) => {
      if (data.index !== null) {
        if (resources.pets[data.index]) {
          resources.pets = resources.pets.filter(
            (_pet, index) => index != data.index
          );
          return callback(204, {
            message: `Mascota con indice ${data.index} eliminada`,
          });
        }
        return callback(404, {
          message: `No existe una mascota con el indice ${data.index}`,
        });
      } else {
        return callback(400, { message: `No envió ningún indice` });
      }
    },
    notFound: (data, callback) => {
      callback(404, { message: "No se encontro la ruta" });
    },
  },
};
