module.exports = (owners) => {
  return {
    post: (data, callback) => {
      owners.push(data.payload);
      callback(201, data.payload);
    },
    get: (data, callback) => {
      if (data.index) {
        if (owners[data.index]) {
          return callback(200, owners[data.index]);
        }
        return callback(404, {
          message: `No existe un dueño con el indice ${data.index}`,
        });
      } else {
        if (owners.length > 0) {
          return callback(200, owners);
        }
        return callback(404, { message: "No hay dueños registrados" });
      }
    },
    put: (data, callback) => {
      if (data.index !== null) {
        if (owners[data.index]) {
          owners[data.index] = data.payload;
          return callback(200, owners[data.index]);
        }
        return callback(404, {
          message: `No existe un dueño con el indice ${data.index}`,
        });
      } else {
        return callback(400, { message: `No envió ningún indice` });
      }
    },
    delete: (data, callback) => {
      if (data.index !== null) {
        if (owners[data.index]) {
          owners = owners.filter((_pet, index) => index != data.index);
          return callback(204, {
            message: `Dueño con indice ${data.index} eliminado`,
          });
        }
        return callback(404, {
          message: `No existe un dueño con el indice ${data.index}`,
        });
      } else {
        return callback(400, { message: `No envió ningún indice` });
      }
    },
  };
};
