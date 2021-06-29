import React, { Fragment, useState } from "react";
import "./css/App.css";
import TXs from "./components/TXs";
import WorldMap from "./components/WorldMap";
import TXViz from "./components/TXViz";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { geoMiller } from "d3-geo-projection";

function App() {
  const [showTX, setShowTX] = useState(false);

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

  const style = {
    height: height,
    width: width,
    // marginRight: "0px",
    // marginLeft: "0px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <Fragment>
      <div id="world-map">
        <WorldMap projection={projection} style={style} />
      </div>
      <div id="txs">
        <TXs projection={projection} style={style} />
      </div>
      <div>{showTX ? <TXViz /> : null}</div>

      {/* 
      <button
        onClick={() => {
          setShowTX(!showTX);
        }}
      >
        show tx
      </button> */}
    </Fragment>
  );
}

export default App;
