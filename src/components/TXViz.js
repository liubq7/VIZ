import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./TXViz.css";
import {drawInitNodes} from "../helpers/txVizHelper";

function seedRandom(seed) {
  return ((seed * 9301 + 49297) % 233280) / 233280.0;
}

const TXViz = () => {
  const vizContainer = useRef(null);
  const width = 800;
  const height = 500;

  useEffect(() => {
    if (vizContainer.current) {
      d3.select(vizContainer.current).call((svg) => drawInitNodes(svg, width / 2, height / 2));
    }
  }, []);

  return (
    <svg ref={vizContainer} style={{ height: height, width: width }} />
  );
};

export default TXViz;
