const queriesList = document.getElementById("queriesList");
const modalQuery = document.getElementById("modalQuery");
const formQuery = document.getElementById("formQuery");
const formQueryPet = document.getElementById("queryPet");
const formQueryVeterinary = document.getElementById("queryVeterinary");
const formQueryHistory = document.getElementById("queryHistory");
const formQueryDiagnosis = document.getElementById("queryDiagnosis");
const formQueryIndex = document.getElementById("queryIndex");
const btnCloseQuery = document.getElementById("btnCloseQuery");
const btnSaveQuery = document.getElementById("btnSaveQuery");
const errorAlertContainer = document.getElementById("errorAlertContainer");
const warningAlertContainer = document.getElementById("warningAlertContainer");

const apiUrl = "http://127.0.0.1:5000/";

let queries = [];
let pets = [];
let veterinaries = [];

const renderQueries = async () => {
  try {
    const response = await fetch(`${apiUrl}queries`);
    queries = await response.json();
    if (Array.isArray(queries)) {
      const htmlQueries = queries
        .map(
          (query, index) => `
          <tr>
            <th scope="row">${index}</th>
            <td>${query.pet.name}</td>
            <td>${query.veterinary.firstName} ${query.veterinary.lastName}</td>
            <td>${query.diagnosis}</td>
            <td>${query.createdDate}</td>
            <td>${query.editDate}</td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info btnEditQuery" data-index=${index} data-toggle="modal"
                data-target="#modalQuery">
                  <i class="fas fa-edit"></i>
                </button>
              </div>
            </td>
          </tr>`
        )
        .join("");
      queriesList.innerHTML = htmlQueries;
      Array.from(document.getElementsByClassName("btnEditQuery")).forEach(
        (btn, index) => btn.addEventListener("click", openEditQuery(index))
      );
    }
  } catch (error) {
    console.log({ error });
    errorAlertContainer.classList.add("show");
  }
};
const renderPets = async () => {
  try {
    const response = await fetch(`${apiUrl}pets`);
    pets = await response.json();
    if (Array.isArray(pets)) {
      const htmlPets = pets
        .map(
          (pet, index) => `
          <option value="${index}">${pet.name}</option>`
        )
        .join("");
      formQueryPet.innerHTML += htmlPets;
    }
  } catch (error) {
    console.log({ error });
    errorAlertContainer.classList.add("show");
  }
};
const renderVeterinaries = async () => {
  try {
    const response = await fetch(`${apiUrl}veterinaries`);
    veterinaries = await response.json();
    if (Array.isArray(veterinaries)) {
      const htmlVeterinaries = veterinaries
        .map(
          (veterinary, index) => `
          <option value="${index}">${veterinary.firstName} ${veterinary.lastName}</option>`
        )
        .join("");
      formQueryVeterinary.innerHTML += htmlVeterinaries;
    }
  } catch (error) {
    console.log({ error });
    errorAlertContainer.classList.add("show");
  }
};
const openEditQuery = (index) => {
  return () => {
    formQueryIndex.value = index;
    formQueryPet.value = queries[index].pet.id;
    formQueryVeterinary.value = queries[index].veterinary.id;
    formQueryHistory.value = queries[index].history;
    formQueryDiagnosis.value = queries[index].diagnosis;
  };
};
const submitData = async () => {
  try {
    const queryData = {
      pet: formQueryPet.value,
      veterinary: formQueryVeterinary.value,
      history: formQueryHistory.value,
      diagnosis: formQueryDiagnosis.value,
    };
    if (validateForm(queryData) === true) {
      let method = "POST";
      let apiUrlSend = `${apiUrl}queries`;
      if (formQueryIndex.value !== "") {
        queries[formQueryIndex.value] = queryData;
        method = "PUT";
        apiUrlSend = `${apiUrl}queries/${formQueryIndex.value}`;
      }
      const response = await fetch(apiUrlSend, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(queryData),
      });
      if (response.ok) {
        clearQueryModal();
        renderQueries();
      }
      modalQuery.classList.toggle("show");
      const modalBackdrop = document.querySelector(".modal-backdrop");
      modalBackdrop.classList.toggle("show");
      return;
    }
    warningAlertContainer.classList.add("show");
  } catch (error) {
    console.error({ error });
    errorAlertContainer.classList.add("show");
  }
};
const clearQueryModal = () => {
  formQueryIndex.value = "";
  formQuery.reset();
  formQueryPet.classList.contains("is-invalid") &&
    formQueryPet.classList.remove("is-invalid");
  formQueryPet.classList.contains("is-valid") &&
    formQueryPet.classList.remove("is-valid");
  formQueryVeterinary.classList.contains("is-invalid") &&
    formQueryVeterinary.classList.remove("is-invalid");
  formQueryVeterinary.classList.contains("is-valid") &&
    formQueryVeterinary.classList.remove("is-valid");
  formQueryHistory.classList.contains("is-invalid") &&
    formQueryHistory.classList.remove("is-invalid");
  formQueryHistory.classList.contains("is-valid") &&
    formQueryHistory.classList.remove("is-valid");
  formQueryDiagnosis.classList.contains("is-invalid") &&
    formQueryDiagnosis.classList.remove("is-invalid");
  formQueryDiagnosis.classList.contains("is-valid") &&
    formQueryDiagnosis.classList.remove("is-valid");
  warningAlertContainer.classList.remove("show");
};
const validateForm = (data) => {
  let response = true;
  if (typeof data !== "object") response = false;
  for (let key in data) {
    if (data[key] === "") {
      key = "query" + key.charAt(0).toUpperCase() + key.slice(1);
      document.getElementById(key).classList.add("is-invalid");
      response = false;
    } else {
      key = "query" + key.charAt(0).toUpperCase() + key.slice(1);
      document.getElementById(key).classList.remove("is-invalid");
      document.getElementById(key).classList.add("is-valid");
    }
  }
  return response;
};

formQuery.addEventListener("submit", (e) => e.preventDefault());
btnSaveQuery.addEventListener("click", () => submitData());
btnCloseQuery.addEventListener("click", () => clearQueryModal());
renderQueries();
renderPets();
renderVeterinaries();
