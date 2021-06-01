import React, { Fragment } from "react";
import "./App.css";
import TX from "./components/TX";
import WorldMap from "./components/WorldMap";

function App() {
  return (
    <Fragment>
      <div id="world-map">
        <WorldMap />
      </div>
      <div id="tx">
        <TX />
      </div>
    </Fragment>
  );
}

export default App;
