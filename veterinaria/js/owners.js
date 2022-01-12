const ownersList = document.getElementById("ownersList");
const formOwner = document.getElementById("formOwner");
const formOwnerIndex = document.getElementById("ownerIndex");
const formOwnerIdentification = document.getElementById("ownerIdentification");
const formOwnerFirstName = document.getElementById("ownerFirstName");
const formOwnerLastName = document.getElementById("ownerLastName");
const formOwnerCountry = document.getElementById("ownerCountry");
const btnCloseOwner = document.getElementById("btnCloseOwner");
const btnSaveOwner = document.getElementById("btnSaveOwner");

let owners = [
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

const renderOwners = () => {
  const htmlOwners = owners
    .map(
      (owner, index) => `
    <tr>
      <th scope="row">${index}</th>
      <td>${owner.identification}</td>
      <td>${owner.firstName}</td>
      <td>${owner.lastName}</td>
      <td>${owner.country}</td>
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
};
const openEditOwner = (index) => {
  return () => {
    formOwnerIndex.value = index;
    formOwnerIdentification.value = owners[index].identification;
    formOwnerFirstName.value = owners[index].firstName;
    formOwnerLastName.value = owners[index].lastName;
    formOwnerCountry.value = owners[index].country;
  };
};
const submitData = () => {
  const ownerData = {
    identification: formOwnerIdentification.value,
    firstName: formOwnerFirstName.value,
    lastName: formOwnerLastName.value,
    country: formOwnerCountry.value,
  };
  if (formOwnerIndex.value !== "") {
    owners[formOwnerIndex.value] = ownerData;
  } else {
    owners.push(ownerData);
  }
  closeOwner();
  renderOwners();
};
const deleteOwner = (index) => {
  return () => {
    owners.splice(index, 1);
    renderOwners();
  };
};
const closeOwner = () => {
  formOwnerIndex.value = "";
  formOwner.reset();
};

formOwner.addEventListener("submit", (e) => e.preventDefault());
btnSaveOwner.addEventListener("click", () => submitData());
btnCloseOwner.addEventListener("click", () => closeOwner());
renderOwners();
