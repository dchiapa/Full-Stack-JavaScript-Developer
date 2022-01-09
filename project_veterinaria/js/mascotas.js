const petList = document.getElementById("petList");
let pets = [{ tipo: "Gato", nombre: "Tigresa", dueno: "Diego" }];

const renderPets = () => {
  const htmlPets = pets
    .map(
      (pet, index) => `
    <tr>
      <th scope="row">${index}</th>
      <td>${pet.tipo}</td>
      <td>${pet.nombre}</td>
      <td>${pet.dueno}</td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-info">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="btn btn-danger">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </td>
    </tr>`
    )
    .join("");
  petList.innerHTML = htmlPets;
};

renderPets();
