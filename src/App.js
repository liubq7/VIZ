import React, { Fragment } from "react";
import "./App.css";
import TX from "./components/TX";
import MapTest from "./components/MapTest";

function App() {
  return (
    <Fragment>
      <div id="maptest">
        <MapTest />
      </div>
      <div id="tx">
        <TX />
      </div>
    </Fragment>
  );
}

export default App;
