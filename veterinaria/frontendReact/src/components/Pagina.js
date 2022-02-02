import React from "react";
import ActionsMenu from "./ActionsMenu";
import Modal from "./Modal";
import Nav from "./Nav";
import Table from "./Table";
const Pagina = () => {
  return (
    <>
      <div className="container">
        <Nav />
        <ActionsMenu />
        <Table />
      </div>
      <Modal />
    </>
  );
};

export default Pagina;
