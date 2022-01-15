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
const alertContainer = document.getElementById("alertContainer");
const apiUrl = "http://127.0.0.1:5000/veterinaries";

const renderVeterinaries = async () => {
  try {
    const response = await fetch(apiUrl);
    const veterinaries = await response.json();
    if (Array.isArray(veterinaries)) {
      const htmlVeterinaries = veterinaries
        .map(
          (veterinary, index) => `
    <tr>
      <th scope="row">${index}</th>
      <td>${veterinary.document}</td>
      <td>${veterinary.firstName}</td>
      <td>${veterinary.lastName}</td>
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
      Array.from(
        document.getElementsByClassName("btnDeleteVeterinary")
      ).forEach((btn, index) =>
        btn.addEventListener("click", deleteVeterinary(index))
      );
      return;
    }
    veterinariesList.innerHTML = `
      <tr>
        <td colspan="5"" align="center">No hay veterinarios registradas</td>
      </tr>`;
  } catch (error) {
    console.error({ error });
  }
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
