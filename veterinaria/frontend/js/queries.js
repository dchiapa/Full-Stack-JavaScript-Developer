const queriesList = document.getElementById("queriesList");
const formQuery = document.getElementById("formQuery");
const formQueryPet = document.getElementById("queryPets");
const formQueryVeterinary = document.getElementById("queryVeterinaries");
const formQueryHistory = document.getElementById("queryHistory");
const formQueryDiagnosis = document.getElementById("queryDiagnosis");
const formQueryIndex = document.getElementById("queryIndex");

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
            <td>${query.addedDate}</td>
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
    let method = "POST";
    let apiUrlSend = apiUrl;
    if (formQueryIndex.value !== "") {
      queries[formQueryIndex.value] = queryData;
      method = "PUT";
      apiUrlSend = `${apiUrl}/${formQueryIndex.value}`;
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
  } catch (error) {
    console.error({ error });
  }
};

renderQueries();
renderPets();
renderVeterinaries();
