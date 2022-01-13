const resources = require("./resources");
const pets = require("./routes/pets");

module.exports = {
  "": (data, callback) => {
    callback(200, { message: "Estas en /" });
  },
  mascotas: pets(resources.pets),
  notFound: (data, callback) => {
    callback(404, { message: "No se encontro la ruta" });
  },
};
