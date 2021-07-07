import React, { useState } from "react";
import "./css/App.css";
import TXs from "./components/TXs";
import WorldMap from "./components/WorldMap";
import TXViz from "./components/TXViz";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { geoMiller } from "d3-geo-projection";
import SearchBox from "./components/SearchBox";

function App() {
  const [txVizHash, setTxVizHash] = useState(null);

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
    <div style={centerStyle}>
      <div id="world-map">
        <WorldMap projection={projection} centerStyle={centerStyle} />
      </div>

      <div id="cryptape">
        <h1>CRYPTAPE</h1>
      </div>
      <div id="decoration-top">
        <img src={"./decoration-top.svg"} width={width * 0.1} />
      </div>
      <div id="decoration-bottom">
        <img src={"./decoration-bottom.svg"} width={width * 0.1} />
      </div>
      <div id="legend">
        <img src={"./legend.svg"} width={width * 0.04} />
      </div>

      {/* <div id="txs">
        <TXs
          projection={projection}
          centerStyle={centerStyle}
          txVizHashChanger={setTxVizHash}
        />
      </div> */}

      <div id="tx-viz">
        {txVizHash == null ? null : (
          <TXViz txVizHash={txVizHash} txVizHashChanger={setTxVizHash} />
        )}
      </div>

      <div id="bottom-line">
        <svg style={{ width: width * 0.6, height: "2px" }}>
          <line
            x1={0}
            y1={2}
            x2={width * 0.6}
            y2={2}
            style={{ stroke: "#B8B8B8", strokeWidth: "0.5px" }}
          />
          <rect
            x={width * 0.6 - 670}
            y={0}
            width={2}
            height={2}
            style={{ fill: "#E6E6E6" }}
          />
          <rect
            x={width * 0.6 - 2}
            y={0}
            width={2}
            height={2}
            style={{ fill: "#E6E6E6" }}
          />
        </svg>
      </div>

      <div id="search-box">
        <SearchBox txVizHashChanger={setTxVizHash} />
      </div>
    </div>
  );
}

export default App;
