const veterinariesList = document.getElementById("veterinariesList");
const formVeterinary = document.getElementById("formVeterinary");
const formVeterinaryIndex = document.getElementById("veterinaryIndex");
const formVeterinaryIdentification = document.getElementById(
  "veterinaryIdentification"
);
const formVeterinaryFirstName = document.getElementById("veterinaryFirstName");
const formVeterinaryLastName = document.getElementById("veterinaryLastName");
const formVeterinaryCountry = document.getElementById("veterinaryCountry");
const btnCloseVeterinary = document.getElementById("btnCloseVeterinary");
const btnSaveVeterinary = document.getElementById("btnSaveVeterinary");

let veterinaries = [
  {
    identification: "123456789",
    firstName: "Diego",
    lastName: "Chiapa",
    country: "Argentina",
  },
  {
    identification: "345678912",
    firstName: "Juan",
    lastName: "Castillejo",
    country: "Uruguay",
  },
];

const renderVeterinaries = () => {
  const htmlVeterinaries = veterinaries
    .map(
      (veterinary, index) => `
    <tr>
      <th scope="row">${index}</th>
      <td>${veterinary.identification}</td>
      <td>${veterinary.firstName}</td>
      <td>${veterinary.lastName}</td>
      <td>${veterinary.country}</td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-info btnEditVeterinary" data-index=${index} data-toggle="modal"
          data-target="#modalVeterinary">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="btn btn-danger btnDeleteVeterinary">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </td>
    </tr>`
    )
    .join("");
  veterinariesList.innerHTML = htmlVeterinaries;
  Array.from(document.getElementsByClassName("btnEditVeterinary")).forEach(
    (btn, index) => btn.addEventListener("click", openEditVeterinary(index))
  );
  Array.from(document.getElementsByClassName("btnDeleteVeterinary")).forEach(
    (btn, index) => btn.addEventListener("click", deleteVeterinary(index))
  );
};
const openEditVeterinary = (index) => {
  return () => {
    formVeterinaryIndex.value = index;
    formVeterinaryIdentification.value = veterinaries[index].identification;
    formVeterinaryFirstName.value = veterinaries[index].firstName;
    formVeterinaryLastName.value = veterinaries[index].lastName;
    formVeterinaryCountry.value = veterinaries[index].country;
  };
};
const submitData = () => {
  const veterinaryData = {
    identification: formVeterinaryIdentification.value,
    firstName: formVeterinaryFirstName.value,
    lastName: formVeterinaryLastName.value,
    country: formVeterinaryCountry.value,
  };
  if (formVeterinaryIndex.value !== "") {
    veterinaries[formVeterinaryIndex.value] = veterinaryData;
  } else {
    veterinaries.push(veterinaryData);
  }
  closeVeterinary();
  renderVeterinaries();
};
const deleteVeterinary = (index) => {
  return () => {
    veterinaries.splice(index, 1);
    renderVeterinaries();
  };
};
const closeVeterinary = () => {
  formVeterinaryIndex.value = "";
  formVeterinary.reset();
};

formVeterinary.addEventListener("submit", (e) => e.preventDefault());
btnSaveVeterinary.addEventListener("click", () => submitData());
btnCloseVeterinary.addEventListener("click", () => closeVeterinary());
renderVeterinaries();
