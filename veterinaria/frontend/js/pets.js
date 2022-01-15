const petList = document.getElementById("petList");
const formPet = document.getElementById("formPet");
const formPetIndex = document.getElementById("petIndex");
const formPetType = document.getElementById("petType");
const formPetName = document.getElementById("petName");
const formPetOwner = document.getElementById("petOwner");
const btnClosePet = document.getElementById("btnClosePet");
const btnSavePet = document.getElementById("btnSavePet");
const apiUrl = "http://127.0.0.1:5000/pets";

let pets = [];

const renderPets = async () => {
  try {
    const response = await fetch(apiUrl);
    const serverPets = await response.json();
    if (Array.isArray(serverPets)) {
      pets = serverPets;
    }
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
  } catch (error) {
    throw error;
  }
};
const openEditPet = (index) => {
  return () => {
    formPetIndex.value = index;
    formPetType.value = pets[index].type;
    formPetName.value = pets[index].name;
    formPetOwner.value = pets[index].owner;
  };
};
const submitData = async () => {
  try {
    const petData = {
      type: formPetType.value,
      name: formPetName.value,
      owner: formPetOwner.value,
    };
    let method = "POST";
    let apiUrlSend = apiUrl;
    if (formPetIndex.value !== "") {
      pets[formPetIndex.value] = petData;
      method = "PUT";
      apiUrlSend = `${apiUrl}/${formPetIndex.value}`;
    }
    const response = await fetch(apiUrlSend, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(petData),
    });
    if (response.ok) {
      clearPetModal();
      renderPets();
    }
  } catch (error) {
    throw error;
  }
};
const deletePet = (index) => {
  return () => {
    pets.splice(index, 1);
    renderPets();
  };
};
const clearPetModal = () => {
  formPetIndex.value = "";
  formPet.reset();
};

formPet.addEventListener("submit", (e) => e.preventDefault());
btnSavePet.addEventListener("click", () => submitData());
btnClosePet.addEventListener("click", () => closePet());
renderPets();
