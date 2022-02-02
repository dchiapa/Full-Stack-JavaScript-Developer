import React from "react";
import { render } from "react-dom";
import Pagina from "./components/Pagina";
import "./index.scss";

const Index = () => (
  <div>
    <Pagina />
  </div>
);

render(<Index />, document.getElementById("app"));
