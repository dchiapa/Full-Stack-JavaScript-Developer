import React from "react";
import Nav from "./Nav";
const Pagina = () => {
  return (
    <>
      <div className="container">
        <Nav />
        <div className="actionsMenu">
          <h1>Mascotas</h1>
          <div className="actionsMenu__content">
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#modalPet"
            >
              Agregar mascota
            </button>
            <div
              className="alert alert-danger alert-dismissible fade"
              role="alert"
              id="alertContainer"
            >
              <strong>Opps!</strong> Algo hicimos mal, por favor vuelve a
              intentarlo.
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
        <table className="table table-stripped table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tipo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Dueño</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="petList"></tbody>
        </table>
      </div>
      <div
        className="modal fade"
        id="modalPet"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar mascota</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form id="formPet">
                <input type="hidden" id="petIndex" />
                <div className="form-row">
                  <div className="col">
                    <select className="form-control" id="petType">
                      <option>Tipo de animal</option>
                      <option>Perro</option>
                      <option>Gato</option>
                      <option>Ave</option>
                      <option>Otro</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col">
                    <input
                      type="text"
                      id="petName"
                      className="form-control"
                      placeholder="Nombre"
                    />
                  </div>
                  <div className="col">
                    <select className="form-control" id="petOwner">
                      <option>Dueño</option>
                      <option>Diego</option>
                      <option>Juan</option>
                      <option>Pablo</option>
                      <option>Sebastian</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                id="btnClosePet"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                id="btnSavePet"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagina;
