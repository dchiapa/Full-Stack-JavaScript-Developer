import React from "react";
import { render } from "react-dom";
import "./index.scss";

const Index = () => (
  <div>
    <h1>Hola desde react</h1>
  </div>
);

render(<Index />, document.getElementById("app"));
