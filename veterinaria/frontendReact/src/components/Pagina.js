import React from "react";
import ActionsMenu from "./ActionsMenu/ActionsMenu";
import Modal from "./Modal/Modal";
import Nav from "./Nav/Nav";
import Table from "./Table/Table";
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
