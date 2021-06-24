import React, { Fragment, useState } from "react";
import "./css/App.css";
import TXs from "./components/TXs";
import TXNodes from "./components/TXNodes";
import WorldMap from "./components/WorldMap";
import TXViz from "./components/TXViz";

function App() {
  const [showMap, setShowMap] = useState(true);
  const [showTX, setShowTX] = useState(false);
  return (
    <Fragment>
      <button
        onClick={() => {
          setShowMap(true);
          setShowTX(false);
        }}
      >
        show map
      </button>
      <button
        onClick={() => {
          setShowMap(false);
          setShowTX(true);
        }}
      >
        show tx
      </button>
      <div id="world-map">{showMap ? <WorldMap /> : null}</div>
      {/* <div id="txs">
        <TXs />
      </div> */}
      <div>{showTX ? <TXViz /> : null}</div>
    </Fragment>
  );
}

export default App;
