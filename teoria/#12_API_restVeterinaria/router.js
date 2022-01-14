const { owners, pets, queries, veterinaries } = require("./resources");
const ownersRouter = require("./routes/owners");
const petsRoute = require("./routes/pets");
const queriesRoute = require("./routes/queries");
const veterinariesRoute = require("./routes/veterinaries");

module.exports = {
  "": (data, callback) => {
    callback(200, { message: "Estas en /" });
  },
  consultas: queriesRoute(queries),
  duenos: ownersRouter(owners),
  mascotas: petsRoute(pets),
  veterinarios: veterinariesRoute(veterinaries),
  notFound: (data, callback) => {
    callback(404, { message: "No se encontro la ruta" });
  },
};
