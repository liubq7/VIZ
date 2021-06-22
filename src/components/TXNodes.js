import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import {
  initializeNodes,
  drawInitNodes,
  drawLinkedNodes,
} from "../helpers/txNodes";
import { filterData } from "../helpers/filterData";

const TXNodes = (props) => {
  const vizContainer = useRef();
  const width = 800;
  const height = 500;
  const nodes = initializeNodes(width / 2, height / 2);
  let nodesData = filterData(props.time)[0];
  let linksData = filterData(props.time)[1];

  useEffect(() => {
    d3.select(vizContainer.current)
      .call((svg) => drawInitNodes(svg, nodes))
      .call((svg) => drawLinkedNodes(svg, nodes, nodesData, linksData));  // disappera after refreshing???
  }, [nodes, nodesData, linksData]);

  return <svg ref={vizContainer} style={{ height: height, width: width }} />;
};

export default TXNodes;
