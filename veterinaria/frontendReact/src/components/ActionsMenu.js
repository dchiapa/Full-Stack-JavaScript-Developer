import React from "react";

const ActionsMenu = () => {
  return (
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
  );
};

export default ActionsMenu;
