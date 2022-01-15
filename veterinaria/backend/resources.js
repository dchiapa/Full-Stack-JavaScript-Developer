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
      addedDate: new Date(),
      editDate: null,
      description:
        "Se chequeo el estado general, y se aplicaron las vacunas correspondientes",
      diagnosis: "El animal esta en buen estado",
      veterinary: 0,
    },
  ],
  veterinaries: [
    { firstName: "Juan", lastName: "Perez", document: "12345678" },
    { firstName: "Claudia", lastName: "Fernandez", document: "87654321" },
  ],
};
