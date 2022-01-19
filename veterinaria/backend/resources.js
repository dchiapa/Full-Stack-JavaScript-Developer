module.exports = {
  owners: [
    { firstName: "Diego", lastName: "Perez", document: "64568636" },
    { firstName: "Jimena", lastName: "Bolilla", document: "76556756" },
  ],
  pets: [
    { type: "Gato", name: "Tigresa", owner: "Diego" },
    { type: "Perro", name: "Firulais", owner: "Juan" },
  ],
  queries: [
    {
      pet: 0,
      createdDate: new Date(),
      editDate: null,
      history: "Historia del paciente",
      diagnosis: "Diagnostico de la consulta",
      veterinary: 0,
    },
  ],
  veterinaries: [
    { firstName: "Juan", lastName: "Perez", document: "12345678" },
    { firstName: "Claudia", lastName: "Fernandez", document: "87654321" },
  ],
};
