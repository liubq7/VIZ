import React, { Fragment } from "react";
import "./App.css";
import TXs from "./components/TXs";
import WorldMap from "./components/WorldMap";

function App() {
  return (
    <Fragment>
      <div id="world-map">
        <WorldMap />
      </div>
      <div id="txs">
        <TXs />
      </div>
    </Fragment>
  );
}

export default App;
