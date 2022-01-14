const petList = document.getElementById("petList");
const formPet = document.getElementById("formPet");
const formPetIndex = document.getElementById("petIndex");
const formPetType = document.getElementById("petType");
const formPetName = document.getElementById("petName");
const formPetOwner = document.getElementById("petOwner");
const btnClosePet = document.getElementById("btnClosePet");
const btnSavePet = document.getElementById("btnSavePet");
const apiUrl = "http://127.0.0.1:5000/pets";

let pets = [
  { type: "Gato", name: "Tigresa", owner: "Diego" },
  { type: "Perro", name: "Firulais", owner: "Juan" },
];

const getPets = async () => {
  const response = await fetch(apiUrl);
  const serverPets = await response.json();
  Array.isArray(serverPets) && (pets = serverPets);
};
const renderPets = () => {
  getPets();
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
          <button type="button" class="btn btn-info btnEditPet" data-index=${index} data-toggle="modal"
          data-target="#modalPet">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="btn btn-danger btnDeletePet">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </td>
    </tr>`
    )
    .join("");
  petList.innerHTML = htmlPets;
  Array.from(document.getElementsByClassName("btnEditPet")).forEach(
    (btn, index) => btn.addEventListener("click", openEditPet(index))
  );
  Array.from(document.getElementsByClassName("btnDeletePet")).forEach(
    (btn, index) => btn.addEventListener("click", deletePet(index))
  );
};
const openEditPet = (index) => {
  return () => {
    formPetIndex.value = index;
    formPetType.value = pets[index].type;
    formPetName.value = pets[index].name;
    formPetOwner.value = pets[index].owner;
  };
};
const submitData = () => {
  const petData = {
    type: formPetType.value,
    name: formPetName.value,
    owner: formPetOwner.value,
  };
  if (formPetIndex.value !== "") {
    pets[formPetIndex.value] = petData;
  } else {
    pets.push(petData);
  }
  closePet();
  renderPets();
};
const deletePet = (index) => {
  return () => {
    pets.splice(index, 1);
    renderPets();
  };
};
const closePet = () => {
  formPetIndex.value = "";
  formPet.reset();
};

formPet.addEventListener("submit", (e) => e.preventDefault());
btnSavePet.addEventListener("click", () => submitData());
btnClosePet.addEventListener("click", () => closePet());
renderPets();
