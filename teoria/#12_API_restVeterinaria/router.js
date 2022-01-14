const { pets, veterinaries } = require("./resources");
const petsRoute = require("./routes/pets");
const veterinariesRoute = require("./routes/veterinaries");

module.exports = {
  "": (data, callback) => {
    callback(200, { message: "Estas en /" });
  },
  mascotas: petsRoute(pets),
  veterinarios: veterinariesRoute(veterinaries),
  notFound: (data, callback) => {
    callback(404, { message: "No se encontro la ruta" });
  },
};
