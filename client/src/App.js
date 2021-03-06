import React, { useContext, useEffect, useMemo, useState } from "react";
import "./css/App.css";
import TXs from "./components/TXs";
import WorldMap from "./components/WorldMap";
import TXViz from "./components/TXViz";
import useDimensions from "./hooks/useDimensions";
import { geoMiller } from "d3-geo-projection";
import SearchBox from "./components/SearchBox";
import decorationTop from "./images/decorationTop.svg";
import decorationBottom from "./images/decorationBottom.svg";
import legend from "./images/legend.svg";
import { TXVizContext } from "./context/TXVizContext";
import { NodesContext } from "./context/NodesContext";
import DataFinder from "./apis/DataFinder";
import Loader from "./components/Loader";
import { mapNodesGeoData } from "./helpers/processData";

function App() {
  const { txVizHash, setTxVizHash } = useContext(TXVizContext);
  const { nodesGeoData, setNodesGeoData, nodesGeoMap, setNodesGeoMap } =
    useContext(NodesContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNodesGeoData = async () => {
      try {
        const response = await DataFinder.get("/nodes");
        setNodesGeoData(response.data);
        setNodesGeoMap(mapNodesGeoData(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchNodesGeoData();
  }, []);

  const { width, height } = useDimensions();

  const projection = useMemo(() => {
    return geoMiller()
      .scale((width / 630) * 100)
      .rotate([-11, 0])
      .translate([width / 2, height * 0.645]);
  }, [width, height]);

  const centerStyle = useMemo(() => {
    return {
      height,
      width,
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    };
  }, [width, height]);

  return (
    <div style={centerStyle}>
      <div id="world-map">
        <WorldMap projection={projection} centerStyle={centerStyle} />
      </div>

      <div id="cryptape">
        <h1>CRYPTAPE</h1>
      </div>
      <div id="decoration">
        <div id="decoration-top">
          <img src={decorationTop} width={width * 0.1} alt="" />
        </div>
        <div id="decoration-bottom">
          <img src={decorationBottom} width={width * 0.1} alt="" />
        </div>
        <div id="legend">
          <img src={legend} width="48px" alt="" />
        </div>
      </div>

      <div id="loader">{isLoading ? <Loader /> : null}</div>

      <div id="txs">
        {nodesGeoData == null ? null : (
          <TXs
            projection={projection}
            centerStyle={centerStyle}
            setIsLoading={setIsLoading}
          />
        )}
      </div>

      <div id="tx-viz">
        {txVizHash === "" || nodesGeoMap.length === 0 ? null : <TXViz />}
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
        <SearchBox setTxVizHash={setTxVizHash} />
      </div>
    </div>
  );
}

export default App;
