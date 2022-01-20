module.exports = (pets) => {
  return {
    post: (data, callback) => {
      let newPet = data.payload;
      pets = [...pets, newPet];
      callback(201, newPet);
    },
    get: (data, callback) => {
      if (data.index) {
        if (pets[data.index]) {
          return callback(200, pets[data.index]);
        }
        return callback(404, {
          message: `No existe una mascota con el indice ${data.index}`,
        });
      } else {
        if (pets.length > 0) {
          return callback(200, pets);
        }
        return callback(404, { message: "No hay mascotas registradas" });
      }
    },
    put: (data, callback) => {
      if (data.index !== null) {
        if (pets[data.index]) {
          pets[data.index] = data.payload;
          return callback(200, pets[data.index]);
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
        if (pets[data.index]) {
          pets = pets.filter((_pet, index) => index != data.index);
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
  };
};
