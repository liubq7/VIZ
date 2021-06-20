import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./TXViz.css";
import {
  initializeNodes,
  drawInitNodes,
  drawLinkedNodes,
} from "../helpers/txViz";
import { filterData } from "../helpers/filterData";

const TXViz = () => {
  const vizContainer = useRef(null);
  const width = 800;
  const height = 500;
  const nodes = initializeNodes(width / 2, height / 2);
  let nodesData = filterData(1622463476231)[0];
  let linksData = filterData(1622463476231)[1];

  useEffect(() => {
    if (vizContainer.current) {
      d3.select(vizContainer.current)
        .call((svg) => drawInitNodes(svg, nodes))
        .call((svg) => drawLinkedNodes(svg, nodes, nodesData, linksData));
    }
  }, [nodes, nodesData, linksData]);

  return <svg ref={vizContainer} style={{ height: height, width: width }} />;
};

export default TXViz;
