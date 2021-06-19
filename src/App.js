import React, { Fragment } from "react";
import "./App.css";
import TXs from "./components/TXs";
import TXViz from "./components/TXViz";
import WorldMap from "./components/WorldMap";

function App() {
  return (
    <Fragment>
      <div id="world-map">
        <WorldMap />
      </div>
      {/* <div id="txs">
        <TXs />
      </div> */}
      <div>
        <TXViz />
      </div>
    </Fragment>
  );
}

export default App;
