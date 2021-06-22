import React, { Fragment } from "react";
import "./css/App.css";
import TXs from "./components/TXs";
import TXNodes from "./components/TXNodes";
import WorldMap from "./components/WorldMap";
import TXViz from "./components/TXViz";

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
