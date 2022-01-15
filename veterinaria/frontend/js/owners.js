const ownersList = document.getElementById("ownersList");
const formOwner = document.getElementById("formOwner");
const formOwnerIndex = document.getElementById("ownerIndex");
const formOwnerDocument = document.getElementById("ownerDocument");
const formOwnerFirstName = document.getElementById("ownerFirstName");
const formOwnerLastName = document.getElementById("ownerLastName");
const btnCloseOwner = document.getElementById("btnCloseOwner");
const btnSaveOwner = document.getElementById("btnSaveOwner");
const apiUrl = "http://127.0.0.1:5000/owners";

let owners = [];

const renderOwners = async () => {
  const response = await fetch(apiUrl);
  owners = await response.json();
  if (Array.isArray(owners)) {
    const htmlOwners = owners
      .map(
        (owner, index) => `
        <tr>
          <th scope="row">${index}</th>
          <td>${owner.Document}</td>
          <td>${owner.firstName}</td>
          <td>${owner.lastName}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-info btnEditOwner" data-index=${index} data-toggle="modal"
              data-target="#modalOwner">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="btn btn-danger btnDeleteOwner">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </td>
        </tr>`
      )
      .join("");
    ownersList.innerHTML = htmlOwners;
    Array.from(document.getElementsByClassName("btnEditOwner")).forEach(
      (btn, index) => btn.addEventListener("click", openEditOwner(index))
    );
    Array.from(document.getElementsByClassName("btnDeleteOwner")).forEach(
      (btn, index) => btn.addEventListener("click", deleteOwner(index))
    );
    return;
  }
  ownersList.innerHTML = `
    <tr>
      <td colspan="5"" align="center">No hay dueños registradas</td>
    </tr>`;
};
const openEditOwner = (index) => {
  return () => {
    formOwnerIndex.value = index;
    formOwnerDocument.value = owners[index].document;
    formOwnerFirstName.value = owners[index].firstName;
    formOwnerLastName.value = owners[index].lastName;
  };
};
const submitData = async () => {
  const ownerData = {
    document: formOwnerDocument.value,
    firstName: formOwnerFirstName.value,
    lastName: formOwnerLastName.value,
  };
  let method = "POST";
  let apiUrlSend = apiUrl;
  if (formOwnerIndex.value !== "") {
    owners[formOwnerIndex.value] = ownerData;
    method = "PUT";
    apiUrlSend = `${apiUrl}/${formOwnerIndex.value}`;
  }
  const response = await fetch(apiUrlSend, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ownerData),
  });
  if (response.ok) {
    clearOwnerModal();
    renderOwners();
  }
};
const deleteOwner = (index) => {
  const apiUrlDelete = `${apiUrl}/${index}`;
  return async () => {
    const response = await fetch(apiUrlDelete, { method: "DELETE" });
    if (response.ok) {
      renderOwners();
    }
  };
};
const clearOwnerModal = () => {
  formOwnerIndex.value = "";
  formOwner.reset();
};

formOwner.addEventListener("submit", (e) => e.preventDefault());
btnSaveOwner.addEventListener("click", () => submitData());
btnCloseOwner.addEventListener("click", () => clearOwnerModal());
renderOwners();
