import React, { Fragment, useState } from "react";
import "./css/App.css";
import TXs from "./components/TXs";
import WorldMap from "./components/WorldMap";
import TXViz from "./components/TXViz";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { geoMiller } from "d3-geo-projection";
import SearchBox from "./components/SearchBox";

function App() {
  const [showTXViz, setShowTXViz] = useState(false);

  const { innerWidth, innerHeight } = useWindowDimensions();
  let width, height;
  if (innerHeight > (innerWidth - 20) / 2.03) {
    width = innerWidth - 20;
    height = width / 2.03;
  } else {
    height = innerHeight;
    width = height * 2.03;
  }
  const projection = geoMiller()
    .scale((width / 630) * 100)
    .rotate([-11, 0])
    .translate([width / 2, height * 0.645]);

  const centerStyle = {
    height: height,
    width: width,
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <Fragment>
      {/* <button
        onClick={() => {
          setShowTXViz(!showTXViz);
        }}
      >
        show tx
      </button> */}

      <div style={centerStyle}>
        <div id="world-map">
          <WorldMap projection={projection} centerStyle={centerStyle} />
        </div>
        <div id="cryptape">
          <h1>CRYPTAPE</h1>
        </div>
        <div id="txs">
          <TXs projection={projection} centerStyle={centerStyle} />
        </div>
        <div id="search-box">
          <SearchBox />
        </div>
      </div>
      <div>{showTXViz ? <TXViz /> : null}</div>
    </Fragment>
  );
}

export default App;
