const { owners, pets, veterinaries } = require("./resources");
const ownersRouter = require("./routes/owners");
const petsRoute = require("./routes/pets");
const veterinariesRoute = require("./routes/veterinaries");

module.exports = {
  "": (data, callback) => {
    callback(200, { message: "Estas en /" });
  },
  mascotas: petsRoute(pets),
  veterinarios: veterinariesRoute(veterinaries),
  duenos: ownersRouter(owners),
  notFound: (data, callback) => {
    callback(404, { message: "No se encontro la ruta" });
  },
};
