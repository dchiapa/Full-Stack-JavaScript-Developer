module.exports = (queries) => {
  return {
    post: (data, callback) => {
      let newQuery = data.payload;
      newQuery.addedDate = new Date();
      newQuery.edtiDate = null;
      queries = [...queries, newQuery];
      callback(201, data.payload);
    },
    get: (data, callback) => {
      if (data.index) {
        if (queries[data.index]) {
          return callback(200, queries[data.index]);
        }
        return callback(404, {
          message: `No existe una consulta con el indice ${data.index}`,
        });
      } else {
        if (queries.length > 0) {
          return callback(200, queries);
        }
        return callback(404, { message: "No hay consultas registradas" });
      }
    },
    put: (data, callback) => {
      if (data.index !== null) {
        if (queries[data.index]) {
          let query = data.payload;
          query.editDate = new Date();
          queries[data.index] = query;
          return callback(200, queries[data.index]);
        }
        return callback(404, {
          message: `No existe una consulta con el indice ${data.index}`,
        });
      } else {
        return callback(400, { message: `No envió ningún indice` });
      }
    },
    delete: (data, callback) => {
      if (data.index !== null) {
        if (queries[data.index]) {
          queries = queries.filter((_pet, index) => index != data.index);
          return callback(204, {
            message: `Consulta con indice ${data.index} eliminada`,
          });
        }
        return callback(404, {
          message: `No existe una consulta con el indice ${data.index}`,
        });
      } else {
        return callback(400, { message: `No envió ningún indice` });
      }
    },
  };
};
