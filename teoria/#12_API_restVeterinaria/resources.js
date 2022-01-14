module.exports = {
  owners: [
    { firstName: "Diego", lastName: "Perez", documento: "64568636" },
    { firstName: "Jimena", lastName: "Bolilla", documento: "76556756" },
  ],
  pets: [
    { type: "Gato", name: "Tigresa", owner: "Diego" },
    { type: "Perro", name: "Firulais", owner: "Juan" },
  ],
  queries: [
    {
      pet: 0,
      date: new Date(),
      titulo: "Chequeo y vacunación",
      description:
        "Se chequeo el estado general, y se aplicaron las vacunas correspondientes",
      diagnosis: "El animal esta en buen estado",
      veterinary: 0,
    },
  ],
  veterinaries: [
    { firstName: "Juan", lastName: "Perez", documento: "12345678" },
    { firstName: "Claudia", lastName: "Fernandez", documento: "87654321" },
  ],
};
