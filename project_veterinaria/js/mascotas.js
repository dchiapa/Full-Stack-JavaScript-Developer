const petList = document.getElementById("petList");
const petIndex = document.getElementById("petIndex");
const petType = document.getElementById("petType");
const petName = document.getElementById("petName");
const petOwner = document.getElementById("petOwner");
const formPet = document.getElementById("formPet");
const btnPet = document.getElementById("btnPet");

let pets = [{ type: "Gato", name: "Tigresa", owner: "Diego" }];

const renderPets = () => {
  const htmlPets = pets
    .map(
      (pet, index) => `
    <tr>
      <th scope="row">${index}</th>
      <td>${pet.type}</td>
      <td>${pet.name}</td>
      <td>${pet.owner}</td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-info btnEditPet" data-index=${index}>
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
  Array.from(document.getElementsByClassName("btnEditPet")).forEach(
    (btn, index) => btn.addEventListener("click", editPet(index))
  );
};

const addPet = (e) => {
  e.preventDefault();
  const newPet = {
    type: petType.value,
    name: petName.value,
    owner: petOwner.value,
  };
  pets.push(newPet);
  renderPets();
  formPet.reset();
};
const editPet = (index) => {
  return () => {
    console.log("edit", index);
  };
};

formPet.addEventListener("submit", (e) => addPet(e));
btnPet.addEventListener("click", (e) => addPet(e));
renderPets();
