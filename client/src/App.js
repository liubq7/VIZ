import React, { useContext, useEffect } from "react";
import "./css/App.css";
import TXs from "./components/TXs";
import WorldMap from "./components/WorldMap";
import TXViz from "./components/TXViz";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { geoMiller } from "d3-geo-projection";
import SearchBox from "./components/SearchBox";
import decorationTop from "./images/decorationTop.svg";
import decorationBottom from "./images/decorationBottom.svg";
import legend from "./images/legend.svg";
import { TXVizContext } from "./context/TXVizContext";
import { NodesContext } from "./context/NodesContext";
import DataFinder from "./apis/DataFinder";

function App() {
  const { txVizHash } = useContext(TXVizContext);
  const {nodesGeoData, setNodesGeoData} = useContext(NodesContext);

  useEffect(() => {
    const fetchNodesGeoData = async () => {
      try {
        const response = await DataFinder.get("/nodes");
        setNodesGeoData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNodesGeoData();
  }, [])

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
        <img src={decorationTop} width={width * 0.1} alt="" />
      </div>
      <div id="decoration-bottom">
        <img src={decorationBottom} width={width * 0.1} alt="" />
      </div>
      
      <div id="legend">
        <img src={legend} width="48px" alt="" />
      </div>

      <div id="txs">
        {nodesGeoData == null ? null : <TXs projection={projection} centerStyle={centerStyle} />}
      </div>

      <div id="tx-viz">{txVizHash === "" || nodesGeoData == null ? null : <TXViz />}</div>

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
        <SearchBox />
      </div>
    </div>
  );
}

export default App;
