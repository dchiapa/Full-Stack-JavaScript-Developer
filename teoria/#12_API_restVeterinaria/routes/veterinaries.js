module.exports = (veterinaries) => {
  return {
    post: (data, callback) => {
      veterinaries.push(data.payload);
      callback(201, data.payload);
    },
    get: (data, callback) => {
      if (data.index) {
        if (veterinaries[data.index]) {
          return callback(200, veterinaries[data.index]);
        }
        return callback(404, {
          message: `No existe un veterinario con el indice ${data.index}`,
        });
      } else {
        if (veterinaries.length > 0) {
          return callback(200, veterinaries);
        }
        return callback(404, { message: "No hay veterinarios registrados" });
      }
    },
    put: (data, callback) => {
      if (data.index !== null) {
        if (veterinaries[data.index]) {
          veterinaries[data.index] = data.payload;
          return callback(200, veterinaries[data.index]);
        }
        return callback(404, {
          message: `No existe un veterinario con el indice ${data.index}`,
        });
      } else {
        return callback(400, { message: `No envió ningún indice` });
      }
    },
    delete: (data, callback) => {
      if (data.index !== null) {
        if (veterinaries[data.index]) {
          veterinaries = veterinaries.filter(
            (_pet, index) => index != data.index
          );
          return callback(204, {
            message: `Veterinario con indice ${data.index} eliminado`,
          });
        }
        return callback(404, {
          message: `No existe un veterinario con el indice ${data.index}`,
        });
      } else {
        return callback(400, { message: `No envió ningún indice` });
      }
    },
  };
};
