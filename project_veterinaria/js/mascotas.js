const listaMascotas = document.getElementById("listaMascotas");
let mascotas = [{ tipo: "Gato", nombre: "Tigresa", dueno: "Diego" }];

const listarMascotas = () => {
  const htmlMascotas = mascotas
    .map(
      (mascota, indice) => `
    <tr>
      <th scope="row">${indice}</th>
      <td>${mascota.tipo}</td>
      <td>${mascota.nombre}</td>
      <td>${mascota.dueno}</td>
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
  listaMascotas.innerHTML = htmlMascotas;
};

listarMascotas();
