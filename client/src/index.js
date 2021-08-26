import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import { TXVizContextProvider } from "./context/TXVizContext";
import { NodesContextProvider } from "./context/NodesContext";

ReactDOM.render(
  <React.StrictMode>
    <NodesContextProvider>
      <TXVizContextProvider>
        <App />
      </TXVizContextProvider>
    </NodesContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
