module.exports = (pets) => {
  return {
    post: (data, callback) => {
      pets.push(data.payload);
      callback(201, data.payload);
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
        callback(200, pets);
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
