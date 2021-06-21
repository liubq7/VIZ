import React, { Fragment } from "react";
import "./css/App.css";
import TXs from "./components/TXs";
import TXNodes from "./components/TXNodes";
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
        <TXNodes />
      </div>
    </Fragment>
  );
}

export default App;
